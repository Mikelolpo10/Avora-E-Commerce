import ReviewBox from "../../components/ReviewBox";

export interface Review {
  title: string;
  body: string;
  source: string;
}

const reviews: Review[] = [
  {
    title: 'Sangat Memuaskan',
    body: 'Wow banget pertama kali beli di toko ini dan sesuai ekspektasi banget, bahannya halus dan nyaman. Pokoknya puas banget bakal jdi langganan. 🥰🥰',
    source: 'Alian, Tokopedia review'
  }, {
    title: 'Murah & Lembut',
    body: 'gausa diragukan lagi belanja di toko ini sumpah bagus banget dengan harga segitu dapat banyak lembut alus poll pengiriman juga cepet bakal langganan deh makasi seller',
    source: 'Sinta, Tokopedia review'
  }, {
    title: 'Murah & Lembut',
    body: 'gausa diragukan lagi belanja di toko ini sumpah bagus banget dengan harga segitu dapat banyak lembut alus poll pengiriman juga cepet bakal langganan deh makasi seller',
    source: 'Sinta, Tokopedia review'
  }, {
    title: 'Murah & Lembut',
    body: 'gausa diragukan lagi belanja di toko ini sumpah bagus banget dengan harga segitu dapat banyak lembut alus poll pengiriman juga cepet bakal langganan deh makasi seller',
    source: 'Sinta, Tokopedia review'
  }, {
    title: 'Murah & Lembut',
    body: 'gausa diragukan lagi belanja di toko ini sumpah bagus banget dengan harga segitu dapat banyak lembut alus poll pengiriman juga cepet bakal langganan deh makasi seller',
    source: 'Sinta, Tokopedia review'
  }
]

export default function Reviews() {
  return (
    <section className="my-16">
      <div className="pb-12 flex items-center justify-center">
        <h2 className="text-primary-black text-3xl font-bold uppercase">what our customers says.</h2>
      </div>

      {/* Slider */}
      <div className="mx-16 flex gap-6 overflow-x-scroll z-30 scrollbar-thin scrollbar-thumb-primary scrollbar-track-gray-100">
        {reviews.map(({ title, body, source }, i) => (
          <ReviewBox
            key={i}
            title={title}
            body={body}
            source={source}
          />
        ))}
      </div>
    </section>
  )
}