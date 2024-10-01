

import React, { useEffect, useRef, useState } from 'react';
import useScreenSize from './useScreenSize';

import './styles/tailwind.css';


type data = {
  children: React.ReactNode | React.ReactElement[];
  cl?: string;
}

type props =  {
  children: data[];
  breackpointW?: { maxWidth: number, width: number }[];
  breackpointH?: { maxHeight: number, height:  number }[];
  dots?: dotsConfig;
}

type dotsConfig = {
  active: boolean;
  colorActive?: string;
  color?: string;
  borderColor?: string;
  borderColorActive?: string;
  borderWidth?: string;
  borderWidthActive?: string;
}

const Carousel: React.FC = React.memo(({breackpointW, breackpointH, children, dots}: props) => {
  const [index, setIndex] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);
  const [load, setLoad] = useState<boolean>(true);
  const [cards, setCards] = useState<data[]>();
  const startPosition = useRef(0);
  const [heightCarousel, setHeightCarousel] = useState<number>();
  const [widthCarousel, setWidthCarousel] = useState<number>();

  const { width, height } = useScreenSize();

  //Oculta los componentes entrantes
  useEffect(()=>{
    const dataIn: data[] = [];
    for (const element of children) {
      dataIn.push({
        children: element.children,
        cl: 'hidden'
      })
    };
    setCards(dataIn);
  },[]);
  
  //Deja visible los primeros 3 componentes
  useEffect(()=>{
    if(load && cards && width > 0) {
      move(0);
      setLoad(false);
    }
  }, [cards, width]);

  //Ajusta el ancho y el alto de la pantalla según los props (Opcional)
  useEffect(() => {
    if(width > 0)
    if(breackpointW) {
      let w = 0;
      breackpointW.sort((a, b) => a.maxWidth - b.maxWidth);
      for (const point of breackpointW) {
        if(point.maxWidth >= width) {
          w = point.width;
        }
      }
      if(w !== 0)
      setWidthCarousel(w);
    }

    if(height > 0)
      if(breackpointH) {
        let h = 0;
        breackpointH.sort((a, b) => a.maxHeight - b.maxHeight);
        for (const point of breackpointH) {
          if(point.maxHeight >= width) {
            h = point.height;
          }
        }
        if(h !== 0)
        setHeightCarousel(h);
      }
  }, [width, height]);

  //Mueve el carousel
  const move = (indexNext: number) => {
    if(cards) {
      const newMove = cards;
      if(indexNext > cards.length-1) {
        indexNext = 0;
      }
      if(indexNext == -1) {
        indexNext = cards.length-1;
      }
      newMove.forEach((val, index)=> {
        newMove[index].cl = 'hidden';
        
        if(index == indexNext) {
          newMove[index].cl = `left-0 ${width <= 768 ? 'w-2/3 translate-x-1/4' : 'w-1/2 translate-x-1/2'} p-0 z-10 shadow-2xl`;
        }
        if(index == indexNext+1) {
          newMove[index].cl = 'left-0 w-[49%] p-4 md:p-12 translate-x-full z-0 opacity-80';
        }
        if(index == indexNext-1) {
          newMove[index].cl = 'left-0 w-[49%] p-4 md:p-12 translate-x-0 md:translate-x-12 z-0 opacity-80';
        }
      });

      if(indexNext == 0) {
        newMove[cards.length-1].cl = 'left-0 w-[49%] p-4 md:p-12 translate-x-0 md:translate-x-12 z-0 opacity-80';
      }

      if(indexNext == cards.length-1) {
        newMove[0].cl = 'left-0 w-[49%] p-4 md:p-12 translate-x-full z-0 opacity-80';
      }

      setCards([...newMove]);
      setIndex(indexNext);
    }
  }

  //Toma la posición actual al arrastrar el carousel
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    startPosition.current = e.clientX;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    startPosition.current = e.touches[0].clientX;
  };

  //Calcula si se arratró el carousel más de 100 pixeles para moverlo
  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    const endPosition = e.clientX;

    moveDrag(endPosition, 100);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const endPosition = e.touches[0].clientX;

    moveDrag(endPosition, 50);
  };

  const moveDrag = (endPosition, limit) => {
    const difference = startPosition.current - endPosition;

    if (difference > limit) {
      move(index+1)
    } else if (difference < -limit) {
      move(index-1)
    }
  }

  return <>
  {
    cards && <section className={`flex w-full items-center justify-center relative my-2 ${isDragging ? 'cursor-grabbing' :'cursor-grab'} max-w-[100vw]`}
    style={{height: heightCarousel ? heightCarousel+'px': '100%', width: widthCarousel ? widthCarousel+'px' : '100%'}}>
    {
      cards.map((item, i) => <><section key={i}
      draggable
      onDragStart={handleDragStart}
      onTouchStart={handleTouchStart}
      onDragEnd={handleDragEnd}
      onTouchMove={handleTouchEnd}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
       className={`absolute transition-all ease-in-out duration-300 ${item.cl}`}>{item.children}</section>

       </>)
    }
    <section className={`opacity-0 w-2/3 h-max`}>{cards[0].children}</section>
    <img onClick={()=>move(index-1)} className='w-12 xl:w-20 absolute left-0 md:left-4 top-[40%] md:top-1/2 z-20 cursor-pointer' src={'https://fundacionrh.vercel.app/_next/image?url=%2Ficons%2Fprev.png&w=96&q=75'} alt='prev' width={90} height={90}/>
    <img onClick={()=>move(index+1)} className='w-12 xl:w-20 absolute right-0 lg:right-4 top-[40%] md:top-1/2 z-20 cursor-pointer' src={'https://fundacionrh.vercel.app/_next/image?url=%2Ficons%2Fnext.png&w=96&q=75'} alt='next' width={90} height={90}/>
    {
      dots?.active && <span className='flex justify-center text-5xl absolute bottom-0'>
      {
        cards.map((item, i) => <>
        {
          i == index ? <span className='border-2 h-2 w-8 mx-2 bg-black/80 border-black/20 rounded transition-all ease-in-out'
          style={{backgroundColor: dots.colorActive ?? '', borderColor: dots.borderColorActive ?? '', borderWidth: dots.borderWidthActive ?? ''}}/> 
          : 
          <span className='border-2 h-2 w-6 mx-1 border-black/20 rounded'
          style={{backgroundColor: dots.color ?? '', borderColor: dots.borderColor ?? '', borderWidth: dots.borderWidth ?? ''}}/> 
        }
        </>)
      }
    </span> 
    }
  </section>
  }
  </>;
})

export default Carousel;
