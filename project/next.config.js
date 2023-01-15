const API_KEY = process.env.API_KEY
const APIURL = "172.17.252.193";

module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },

  async rewrites() {
    return [
      {
        // 신청서 관련
        source: "/contact/application",
        destination: `http://${APIURL}:8080/api/application`,
      },
      {
        // 로그인 (로그인페이지)
        source: "/login",
        destination: `http://${APIURL}:8080/api/members/login`,
      },
    ];
  },

}
