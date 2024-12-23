type Props = {
  width?: string;
  height?: string;
};

function PaymentSizeBox({ width, height }: Props): JSX.Element {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={height ? undefined : width || 238}
      height={width ? undefined : height || 200}
      fill='none'
      viewBox='0 0 238 200'
    >
      <path
        fill='#E3BE8E'
        d='M22.375 114.626l107.721 30.249v-77.19L22.375 40.214v74.411z'
      ></path>
      <path
        fill='#E3BE8E'
        d='M22.375 153.555l107.721 30.25v-77.191L22.375 79.144v74.411z'
      ></path>
      <path
        fill='#D8B182'
        d='M215.437 114.626l-84.329 30.249v-77.19l84.329-27.47v74.411z'
      ></path>
      <path
        fill='#D8B182'
        d='M215.437 153.555l-84.329 30.25v-77.191l84.329-27.47v74.411z'
      ></path>
      <path
        fill='#E3BE8E'
        d='M23.052 39.655L108.377 16 215.08 39.655l-84.468 26.633-107.56-26.633z'
      ></path>
      <path
        fill='#000'
        d='M135.891 179.164v-12.13l9.637-2.449v11.16l-9.637 3.419zm.973-11.324v9.896l7.691-2.728v-9.121l-7.691 1.953zM146.721 175.605v-11.317l8.772-2.294v10.408l-8.772 3.203zm.973-10.517v9.076l6.826-2.493v-8.369l-6.826 1.786z'
      ></path>
      <path
        fill='#CC8C5F'
        d='M152.276 25.78l-.182.058-2.5-.621-83.09 26.185-.126 30.666 2.64.55v.013l16.316 3.32V56.989l87.137-26.192-20.195-5.017z'
        opacity='0.58'
      ></path>
      <path
        fill='#CC8C5F'
        d='M187.423 49.65L82.15 22.895l-27.229 7.789 113.426 25.065.094 33.794 18.982-7.513V49.65z'
        opacity='0.58'
      ></path>
    </svg>
  );
}

export default PaymentSizeBox;
