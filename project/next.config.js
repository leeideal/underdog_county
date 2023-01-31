const APIUR = `${process.env.API_KEY}`;
const APIURL = "52.79.191.113"

module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'underdogcounty.s3.ap-northeast-2.amazonaws.com',
        port: '',
        pathname: 'images/*',
      },
    ],
  },

  async redirects() {
    return [
			{ 
				source: "/video",
        destination: "https://www.youtube.com/@theunderdogcounty9900",
        permanent: false,
			},
    ];
  },

  async rewrites() {
    return [
      {
        // 신청서 관련
        source: "/contact/application",
        destination: `http://${APIURL}/api/application`,
      },
      {
        // 신청서 삭제
        source: "/contact/application/:id",
        destination: `http://${APIURL}/api/application/:id`,
      },

      {
        // 로그인 (로그인페이지)
        source: "/login",
        destination: `http://${APIURL}/api/members/login`,
      },

      {
        // artwork (전체 가져오기)
        source: "/artists",
        destination: `http://${APIURL}/api/artist`,
      },
      {
        // artwork (삭제 전용)
        source: "/artists/:id",
        destination: `http://${APIURL}/api/artist/:id`,
      },
      {
        // artworkImg (전체 가져오기)
        source: "/artists/img/:id",
        destination: `http://${APIURL}/api/artist/s3/:id`,
      },

      {
        // artwork (전체 가져오기)
        source: "/works",
        destination: `http://${APIURL}/api/work`,
      },
      {
        // 작업물 사진
        source: "/works/img/:id",
        destination: `http://${APIURL}/api/work/s3/:id`,
      },
      {
        // 작업물 삭제 전용
        source: "/works/:id",
        destination: `http://${APIURL}/api/work/:id`,
      },
      {
        // artwork 카테고리별 (전체 가져오기)
        source: "/category/:second",
        destination: `http://${APIURL}/api/work/category/:second`,
      },
    ];
  },

}
