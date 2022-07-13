module.exports = {
    reactStrictMode: true,
    env: {
        NEXT_AGILITY_GLASSHOUSE_URL: process.env.NEXT_AGILITY_GLASSHOUSE_URL,
        NEXT_AGILITY_GLASSHOUSE_CREATOR_URL: process.env.NEXT_AGILITY_GLASSHOUSE_CREATOR_URL,
    },
    images: {
        domains: ["cdn.aglty.io"],
        loader: 'akamai',
    }
}