const features = [
  {
    label: "Кожа норвежского лосося",
    desc: "Не блестит. Но у неё такая фактура, что гости будут спрашивать «что это?» с дрожью.",
  },
  {
    label: "Кевларовая нить",
    desc: "Тёмно-оранжевый контрастный шов — намёк на опасность. Швы, которые переживут вас.",
  },
  {
    label: "Цельнофрезерованный алюминий",
    desc: "Углы с лазерной маркировкой: «Regent / № по порядку / Город». Ваш серийный номер.",
  },
  {
    label: "RFID-блокер",
    desc: "Защита всех отделений от кардинга в аэропортах. Ваши карты — только для вас.",
  },
  {
    label: "Свинцовый экран",
    desc: "Тонкий лист в задней стенке. Ваш паспорт не отсканируют на въезде без вашего ведома.",
  },
  {
    label: "Bluetooth-пищалка",
    desc: "Потеряли в ресторане — позвоните, он пропищит. Маленькая деталь, большое спокойствие.",
  },
];

export default function Featured() {
  return (
    <div id="features" className="flex flex-col lg:flex-row lg:justify-between lg:items-center min-h-screen px-6 py-12 lg:py-0 bg-white">
      <div className="flex-1 h-[400px] lg:h-[800px] mb-8 lg:mb-0 lg:order-2">
        <img
          src="https://cdn.poehali.dev/projects/38b343eb-3f94-4415-aa7b-0cf74aec5b3c/files/df886386-bb3f-4aec-bde6-956e7b8ee664.jpg"
          alt="The Chancellery — детали исполнения"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 text-left lg:h-[800px] flex flex-col justify-center lg:mr-12 lg:order-1">
        <h3 className="uppercase mb-4 text-xs tracking-[0.3em] text-neutral-500">Анатомия The Chancellery</h3>
        <p className="text-2xl lg:text-3xl mb-10 text-neutral-900 leading-tight font-light">
          Шесть решений, которые нельзя увидеть сразу. Но именно они отличают владельца от остальных.
        </p>
        <div className="flex flex-col gap-5">
          {features.map((f, i) => (
            <div key={i} className="border-t border-neutral-200 pt-4">
              <p className="text-sm font-semibold uppercase tracking-wider text-neutral-900 mb-1">{f.label}</p>
              <p className="text-sm text-neutral-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
        <button id="order" className="mt-10 bg-black text-white border border-black px-6 py-3 text-xs transition-all duration-300 hover:bg-white hover:text-black cursor-pointer w-fit uppercase tracking-widest">
          Заказать кейс
        </button>
      </div>
    </div>
  );
}
