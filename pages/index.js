import { useState } from 'react';

export default function Home() {
  const [items, setItems] = useState(Array(10).fill(''));
  const [disableButton, setDisableButton] = useState(false)

  const handleGet = async () => {
    let text = await navigator.clipboard.readText();
    const clipboardItems = text.split('\n').filter(item => item.trim());
    if (!clipboardItems[clipboardItems.length - 1].includes("\r")) {
      text = text + "\n"
    }

    for (let index = 0; index < items.length; index++) {
      if (items[index] !== "") {
        text = text + (index + 1 + extractLeadingNumber(clipboardItems[clipboardItems.length - 1])) + ". " + items[index] + "\n"
      }
    }
    await navigator.clipboard.writeText(text);
    setDisableButton(true)
    const timer = setTimeout(() => {
      setDisableButton(false);
    }, 5000);
  };


  function extractLeadingNumber(str) {
    const match = str.match(/^\d+/);
    return match ? parseInt(match[0], 10) : null;
  }

  return (
    <div className="p-4">
      <button onClick={handleGet} disabled={disableButton} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Get
      </button>
      <span className='ml-4' hidden={!disableButton} >Berjaya!</span>
      <div className="mt-4">
        {items.map((item, index) => (
          <input
            key={index}
            type="text"
            value={item}
            onChange={e => {
              const newItems = [...items];
              newItems[index] = e.target.value;
              setItems(newItems);
            }}
            className="mt-2 block w-full rounded-md border-2 border-gray-700 shadow-lg"
          />
        ))}
      </div>
    </div>
  )
}

