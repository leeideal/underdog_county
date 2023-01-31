const API_KEY = process.env.API_KEY
const APIURL = "172.20.10.3";

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
        destination: `http://${APIURL}:8080/api/application`,
      },
      {
        // 신청서 삭제
        source: "/contact/application/:id",
        destination: `http://${APIURL}:8080/api/application/:id`,
      },

      {
        // 로그인 (로그인페이지)
        source: "/login",
        destination: `http://${APIURL}:8080/api/members/login`,
      },

      {
        // artwork (전체 가져오기)
        source: "/artists",
        destination: `http://${APIURL}:8080/api/artist`,
      },
      {
        // artwork (삭제 전용)
        source: "/artists/:id",
        destination: `http://${APIURL}:8080/api/artist/:id`,
      },
      {
        // artworkImg (전체 가져오기)
        source: "/artists/img/:id",
        destination: `http://${APIURL}:8080/api/artist/s3/:id`,
      },

      {
        // artwork (전체 가져오기)
        source: "/works",
        destination: `http://${APIURL}:8080/api/work`,
      },
      {
        // 작업물 사진
        source: "/works/img/:id",
        destination: `http://${APIURL}:8080/api/work/s3/:id`,
      },
      {
        // 작업물 삭제 전용
        source: "/works/:id",
        destination: `http://${APIURL}:8080/api/work/:id`,
      },
      {
        // artwork 카테고리별 (전체 가져오기)
        source: "/category/:second",
        destination: `http://${APIURL}:8080/api/work/category/:second`,
      },
    ];
  },

}
