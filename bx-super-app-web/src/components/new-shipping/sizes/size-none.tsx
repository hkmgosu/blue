type Props = {
  width?: string;
  height?: string;
};

function NewShippingSizesNone({ width, height }: Props): JSX.Element {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={height ? undefined : width || 250}
      height={width ? undefined : height || 200}
      fill='none'
      viewBox='0 0 238 200'
    >
      <path
        fill='#E3BE8E'
        d='M43.066 110.779l65.535 19.091V81.16L43.066 63.825v46.954z'
      />
      <path
        fill='#D8B182'
        d='M160.63 110.779l-51.417 19.091V81.16l51.417-17.335v46.954z'
      />
      <path
        fill='#E3BE8E'
        d='M43.476 63.47l51.96-14.925 64.976 14.926-51.436 16.806-65.5-16.806z'
      />
      <path
        fill='#CC8C5F'
        d='M121.814 54.896l-.112.038-1.508-.389L70.048 70.92l-.077 19.178 1.593.346v.008l9.848 2.075V74.415L134 58.035l-12.186-3.139z'
        opacity='0.58'
      />
      <path
        fill='#CC8C5F'
        d='M143.024 69.827L79.492 53.093l-16.434 4.872 68.455 15.673.056 21.139 11.455-4.703V69.828z'
        opacity='0.58'
      />
    </svg>
  );
}

export default NewShippingSizesNone;
