/** @type {import('next').NextConfig} */
import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();
const API_KEY = process.env.API_KEY;
const nextConfig = {};

export default withNextIntl(nextConfig);
