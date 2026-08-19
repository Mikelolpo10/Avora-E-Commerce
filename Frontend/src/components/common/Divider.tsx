const colorMap = {
  black: 'before:bg-black',
  ash: 'before:bg-[#707070]', // atau warna custom kamu
  white: 'before:bg-white',
  // tambah sesuai kebutuhan
}

type DividerColor = keyof typeof colorMap

export default function Divider({ color = 'black' }: { color?: DividerColor }) {
  return (
    <div className={`${colorMap[color] ?? colorMap.black} relative before:content-[''] before:absolute before:w-full before:h-px`}></div>
  )
}