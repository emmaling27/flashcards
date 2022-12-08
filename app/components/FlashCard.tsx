import { useState } from 'react'
import { Document } from '../convex/_generated/dataModel'
import Image from 'next/image'
export default function ({ card }: { card: Document<'cards'> }) {
  const [front, setFront] = useState(true)

  const flip = () => {
    setFront(!front)
  }
  return (
    <div className={'card'} style={{ backgroundColor: card.color }}>
      {front ? card.front : card.back}
      <div onClick={flip} className={'flip'}>
        <Image src="/flip.svg" height={50} width={50} alt="fip" />
      </div>
    </div>
  )
}
