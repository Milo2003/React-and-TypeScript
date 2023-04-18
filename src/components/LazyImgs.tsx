import {
  useRef,
  useEffect,
  useState,
  ImgHTMLAttributes,
} from 'react';

type LazyImgProps = {
  src: string;
  onLazyLoad?: (img: HTMLImageElement) => void;
};

type ImageNative = ImgHTMLAttributes<HTMLImageElement>;

type Props = LazyImgProps & ImageNative;

export const LazyImg = ({
  src,
  onLazyLoad,
  ...imgProps
}: Props): JSX.Element => {
  const node = useRef<HTMLImageElement>(null);
  const [currentSource, setCurrentSource] = useState(
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=',
  );
  const [isLazyLoaded, setIsLazyLoaded] = useState(false);

  useEffect(() => {
    if (isLazyLoaded) {
      return;
    }
    // nuevo observador
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        //onInstersection
        if (!entry.isIntersecting || !node.current) {
          return;
        } 
        setCurrentSource(src);
        observer.disconnect();
        setIsLazyLoaded(true);
        if (typeof onLazyLoad === 'function') {
          onLazyLoad(node.current);
        }
      });
    });

    // observe node
    if (node.current) {
      observer.observe(node.current);
    }
    // observer.observe(node.current!) => igual a lo anterior

    // desconectar
    return () => {
      observer.disconnect();
    };
  }, [src, onLazyLoad, isLazyLoaded]);

  return <img ref={node} src={currentSource} {...imgProps} />;
};

//maneras de crear y tipar un componente con react y ts =>

// 1 esta es implicita, por lo cual no se deberia usar
// export const RandomImg = () => {
//   return <img />;
// };

// 2 Esta es la forma mas adecuada, mas estandarizada y tipa lo que retorna la funcion
// export const RandomImg = (): JSX.Element => {
//   return <img />;
// };

// import type { FunctionComponent, FC } from 'react'; // cuando se hace un import de tipos usar type, para que los reconozca como tipos y mejore(aliviane) el codigo al compilarlo
//3 Esta tipa la constante, no es igual al anterior pero retornan lo mismo
// export const RandomImg: FunctionComponent = () => {
//   return <img />;
// };

// esta es una abreviatura
// export const RandomImg: FC = (): JSX.Element => {
//   return <img />;
// };
