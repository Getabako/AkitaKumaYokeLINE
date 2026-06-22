import { useEffect, useRef } from 'react'
import L from 'leaflet'
import type { Sighting } from '../lib/sightings'
import {
  ANIMAL_LABEL,
  ANIMAL_COLOR,
  KIND_LABEL,
  formatReportedAt,
  confidencePercent,
} from '../lib/labels'

// Leaflet のデフォルトマーカー画像が壊れる問題に対応（CDN から読む）
const ICON_BASE = 'https://unpkg.com/leaflet@1.9.4/dist/images/'
L.Icon.Default.mergeOptions({
  iconRetinaUrl: `${ICON_BASE}marker-icon-2x.png`,
  iconUrl: `${ICON_BASE}marker-icon.png`,
  shadowUrl: `${ICON_BASE}marker-shadow.png`,
})

// 秋田県の中心と初期ズーム
const AKITA_CENTER: L.LatLngExpression = [39.72, 140.1]
const INITIAL_ZOOM = 9

// 獣種ごとに色分けした丸ピン（DivIcon）を生成
function makeIcon(s: Sighting): L.DivIcon {
  const color = ANIMAL_COLOR[s.animal]
  return L.divIcon({
    className: '',
    html: `<div style="
      width:30px;height:30px;border-radius:50%;
      background:${color};border:3px solid #ffffff;
      box-shadow:0 1px 4px rgba(0,0,0,0.4);
    "></div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -16],
  })
}

// ポップアップの中身（日本語・大きめ）
function popupHtml(s: Sighting): string {
  const pct = confidencePercent(s.confidence)
  const note = s.note
    ? `<div style="margin-top:8px;font-size:16px;line-height:1.8;">${s.note}</div>`
    : ''
  return `
    <div style="font-size:17px;line-height:1.9;letter-spacing:0.03em;min-width:200px;">
      <div style="font-weight:700;font-size:19px;color:${ANIMAL_COLOR[s.animal]};">
        ${ANIMAL_LABEL[s.animal]}・${KIND_LABEL[s.kind]}
      </div>
      <div style="margin-top:8px;">日時：${formatReportedAt(s.reportedAt)}</div>
      <div style="margin-top:4px;">信頼度：${pct}％</div>
      <div style="margin-top:2px;color:#16a34a;font-weight:700;">うそ情報チェック済み</div>
      ${note}
    </div>
  `
}

type Props = {
  sightings: Sighting[]
}

export function MapView({ sightings }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<L.Map | null>(null)
  const layerRef = useRef<L.LayerGroup | null>(null)

  // 地図の初期化（マウント時に1度だけ）
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    const map = L.map(containerRef.current, {
      center: AKITA_CENTER,
      zoom: INITIAL_ZOOM,
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map)

    layerRef.current = L.layerGroup().addTo(map)
    mapRef.current = map

    return () => {
      map.remove()
      mapRef.current = null
      layerRef.current = null
    }
  }, [])

  // 出没情報が変わるたびにピンを描き直す
  useEffect(() => {
    const layer = layerRef.current
    if (!layer) return
    layer.clearLayers()
    for (const s of sightings) {
      const marker = L.marker([s.lat, s.lng], { icon: makeIcon(s) })
      marker.bindPopup(popupHtml(s))
      marker.addTo(layer)
    }
  }, [sightings])

  return <div ref={containerRef} className="h-full w-full" />
}
