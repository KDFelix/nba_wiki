/**
 * 文件名: config.js
 * 用途: 全局配置文件
 * 描述: 存储前端需要的环境配置，主要是 Supabase 的 URL 和 Anon Key。
 *       将配置独立出来，方便用户直接修改，无需深入代码逻辑。
 */
// config.js - 这是你的网页端保险箱
const NBA_CONFIG = {
    // 🔴 只要在这里改一次，HTML 里就会自动更新
    SUPABASE_URL: "https://kzbtewaffzkjjsmmouie.supabase.co",
    SUPABASE_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6YnRld2FmZnprampzbW1vdWllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyODAzODgsImV4cCI6MjA4MDg1NjM4OH0.IJrTgl3UgEEvvTfdO5XkGrxYBt9PdYqnOxlym3v0jdY"
};