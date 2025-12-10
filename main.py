"""
文件名: main.py
用途: 后端数据同步脚本
描述: 负责从 NBA 官方 API 获取最新球员数据，并清洗、格式化后同步到 Supabase 数据库。
      包含数据获取、处理和数据库上传的核心逻辑。
"""
import time
from supabase import create_client
from nba_api.stats.endpoints import commonallplayers

# ================= 配置区域 =================
# 优先从环境变量读取（用于 GitHub Actions 自动化）
# 如果没有环境变量，则使用下面的默认值
import os

SUPABASE_URL = os.getenv("SUPABASE_URL", "https://kzbtewaffzkjjsmmouie.supabase.co")
# ⚠️ 重要：这里需要使用 service_role key（不是 anon key）
# 配置 RLS 后，只有 service_role 才能写入数据
# 从 Supabase Dashboard → Settings → API 获取
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_KEY", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6YnRld2FmZnprampzbW1vdWllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyODAzODgsImV4cCI6MjA4MDg1NjM4OH0.IJrTgl3UgEEvvTfdO5XkGrxYBt9PdYqnOxlym3v0jdY")
# ============================================

def run():
    print("1. 连接 Supabase 数据库...")
    try:
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
    except Exception as e:
        print(f"❌ 连接失败，请检查 URL 和 Key: {e}")
        return

    print("2. 正在向 NBA 官网请求 [2024-25 赛季现役球员名单]...")
    print("   (这一步需要联网，可能会卡住几秒钟，请耐心等待)...")
    
    # 获取现役球员数据
    try:
        player_info = commonallplayers.CommonAllPlayers(is_only_current_season=1)
        # 转换数据格式
        data = player_info.get_dict()['resultSets'][0]
        headers = data['headers'] 
        rows = data['rowSet']
    except Exception as e:
        print(f"❌ 从 NBA 获取数据失败，可能是网络问题: {e}")
        return

    print(f"   ✅ 成功！获取到 {len(rows)} 名现役球员。")
    print("3. 正在整理数据...")

    upload_list = []
    # 找到对应列的位置
    id_index = headers.index('PERSON_ID')
    name_index = headers.index('DISPLAY_FIRST_LAST')
    team_index = headers.index('TEAM_NAME') # 球队列

    for row in rows:
        player_id = row[id_index]
        t_name = row[team_index]
        if not t_name: t_name = "Free Agent" # 如果没球队就是自由球员

        # 生成球员头像 URL（NBA 官方 CDN）
        avatar_url = f"https://cdn.nba.com/headshots/nba/latest/1040x760/{player_id}.png"

        upload_list.append({
            "player_id": player_id,
            "full_name": row[name_index],
            "team_name": t_name,
            "avatar_url": avatar_url,  # 新增头像字段
            "is_active": True 
        })

    print(f"4. 开始写入 Supabase (共 {len(upload_list)} 条)...")
    
    # 批量上传
    batch_size = 100
    for i in range(0, len(upload_list), batch_size):
        batch = upload_list[i : i+batch_size]
        try:
            supabase.table('players').upsert(batch).execute()
            print(f"   已更新: {i + len(batch)} / {len(upload_list)}")
        except Exception as e:
            print(f"❌ 写入出错: {e}")

    print("🎉 全部完成！你的数据库现在是最新的了！")

if __name__ == "__main__":
    run()