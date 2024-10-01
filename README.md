# Ejemplos de uso

## Sencillo
```
import { Carousel } from 'carousel-motion-blured';

<Carousel>
  {[
    {
      children: <MyComponent1/>
    },
    {
      children: <MyComponent2/>
    },
    {
      children: <MyComponent3/>
    },
    {
      children: <MyComponent4/>
    },
    {
      children: <MyComponent5/>
    }
  ]}
</Carousel>
```

- Resultado:

https://test-libreria2-next.vercel.app/carousel-example.mp4

## quitar puntos


```
<Carousel dots={{ active: true }}>
  {[
    {
      children: <MyComponent1/>
    },
    {
      children: <MyComponent2/>
    },
    {
      children: <MyComponent3/>
    },
    {
      children: <MyComponent4/>
    },
    {
      children: <MyComponent5/>
    }
  ]}
</Carousel>
```

```
dots={{
  active: boolean - true/false;
  colorActive?: string - white/#fffff/rgb();
  color?: string - white/#fffff/rgb();
  borderColor?: string - white/#fffff/rgb();
  borderColorActive?: string - white/#fffff/rgb();
  borderWidth?: string - px/rem/%;
  borderWidthActive?: string - px/rem/%;
}}
```