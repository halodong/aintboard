import Head from "next/head";
import { isEmpty } from "lodash";
import { NextSeo } from "next-seo";

import { SeoDataProps } from "types/seoTypes";

const Seo = (props: SeoDataProps) => {
  //will add Ain't Board after pipe in the end of text if not homepage
  const parsedTitle = props.isHomepage
    ? "Ain't Board"
    : `${props?.title} | Ain't Board`;

  const origin =
    process.env.NEXT_PUBLIC_FRONTEND_URL ??
    (process.browser ? window.location.origin : null);

  //props.canonical should be prefixed with /
  const parsedCanonical = !isEmpty(props?.canonical)
    ? `${origin}${props?.canonical}`
    : `${origin}/`;

  return (
    <>
      <Head>
        <link rel="icon" href="/aintboard.ico" />
      </Head>
      <NextSeo
        title={parsedTitle}
        description={props?.description || "Interactive Boardgame Community"}
        canonical={parsedCanonical}
        openGraph={{
          url: parsedCanonical,
          title: parsedTitle,
          description: props?.description || "Interactive Boardgame Community",
          // images: [
          // {
          //     url: 'https://www.example.ie/og-image-01.jpg',
          //     width: 800,
          //     height: 600,
          //     alt: 'Og Image Alt',
          // },
          // {
          //     url: 'https://www.example.ie/og-image-02.jpg',
          //     width: 900,
          //     height: 800,
          //     alt: 'Og Image Alt Second',
          // },
          // { url: 'https://www.example.ie/og-image-03.jpg' },
          // { url: 'https://www.example.ie/og-image-04.jpg' },
          // ],
          site_name: "Ain't Board",
        }}
        // twitter={{
        //     handle: '@handle',
        //     site: '@site',
        //     cardType: 'summary_large_image',
        // }}
      />
    </>
  );
};

export default Seo;
