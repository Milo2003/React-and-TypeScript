import { useState } from 'react';
import { LazyImg } from '@/components/LazyImgs';
import { MouseEventHandler } from 'react';
import { random } from 'lodash';

let count = 0;
// const random = (): number => Math.floor(Math.random() * 123) + 1;
const myRandom = () => random(1, 123);
const generateId = () => (count += 1);

export default function Home() {
  const [images, setImages] = useState<Array<IFoxImageItem>>([]);

  const addNewImg: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    const newImageItem: IFoxImageItem = {
      id: generateId(),
      url: `https://randomfox.ca/images/${myRandom()}.jpg`,
    };
    setImages([...images, newImageItem]);
    window.plausible('add_fox');
  };
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold mt-20 mb-10">
        Lazy Load Images of Foxes
      </h1>
      <p className="text-xl font-medium mb-4">
        Dale click a el boton, para añadir una nueva imagen
      </p>
      <button
        className="bg-green-300 hover:bg-green-500 font-medium rounded-lg transition duration-300 ease-in-out"
        onClick={addNewImg}
      >
        Add new Fox
      </button>
      <div className="grid grid-cols-1  gap-8 mt-8">
        {images.map(({ id, url }, index) => (
          <div key={id} className="p-4 rounded-lg shadow-lg">
            <p className="mb-2 font-medium text-lg">Zorro/s {index + 1}</p>
            <LazyImg
              title="Random Fox"
              src={url}
              width={320}
              className="rounded bg-slate-400"
              onLazyLoad={(img) => {
                console.log(`Image #${index + 1} cargada. Nodo:`, img);
              }}
              onClick={() => console.log('hey')}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
