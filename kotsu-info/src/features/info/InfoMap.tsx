import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { CATEGORY_META } from '../../lib/info'
import type { InfoItem } from '../../lib/info'
import { useInfo } from '../../stores/info'

// Leaflet デフォルトアイコン壊れ対策（バンドラ環境で画像パスが消える問題）
// CDN の画像を直接参照させる
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})
L.Marker.prototype.options.icon = DefaultIcon

// カテゴリ色の丸ピン（divIcon で色分け）
function coloredIcon(color: string, emoji: string): L.DivIcon {
  return L.divIcon({
    className: '',
    html: `<div style="background:${color};width:34px;height:34px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:3px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.4);display:flex;align-items:center;justify-content:center;"><span style="transform:rotate(45deg);font-size:16px;">${emoji}</span></div>`,
    iconSize: [34, 34],
    iconAnchor: [17, 34],
    popupAnchor: [0, -32],
  })
}

export function InfoMap() {
  const mapRef = useRef<L.Map | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const markersRef = useRef<Record<string, L.Marker>>({})

  const items = useInfo((s) => s.items)
  const filter = useInfo((s) => s.filter)
  const selectedId = useInfo((s) => s.selectedId)
  const select = useInfo((s) => s.select)

  // 地図初期化（一度だけ）
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return
    const map = L.map(containerRef.current, {
      center: [39.72, 140.1],
      zoom: 9,
      scrollWheelZoom: false,
    })
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap',
      maxZoom: 18,
    }).addTo(map)
    mapRef.current = map
    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [])

  // フィルタ・データ変更時にピンを再描画
  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    Object.values(markersRef.current).forEach((m) => m.remove())
    markersRef.current = {}

    const visible = items.filter(
      (it): it is InfoItem & { lat: number; lng: number } =>
        it.lat != null && it.lng != null && (filter === 'all' || it.category === filter),
    )

    visible.forEach((it) => {
      const meta = CATEGORY_META[it.category]
      const marker = L.marker([it.lat, it.lng], {
        icon: coloredIcon(meta.color, meta.emoji),
      })
        .addTo(map)
        .bindPopup(
          `<b>${meta.emoji} ${meta.label}</b><br>${it.title}<br><span style="color:#555">${it.place}</span>`,
        )
      marker.on('click', () => select(it.id))
      markersRef.current[it.id] = marker
    })
  }, [items, filter, select])

  // 選択された情報へパン＆ポップアップ
  useEffect(() => {
    const map = mapRef.current
    if (!map || !selectedId) return
    const marker = markersRef.current[selectedId]
    const item = items.find((i) => i.id === selectedId)
    if (marker && item && item.lat != null && item.lng != null) {
      map.flyTo([item.lat, item.lng], 12, { duration: 0.6 })
      marker.openPopup()
    }
  }, [selectedId, items])

  return (
    <div
      ref={containerRef}
      className="w-full h-64 rounded-3xl overflow-hidden shadow-md border border-slate-200"
      aria-label="交通・くらし情報の地図"
    />
  )
}
