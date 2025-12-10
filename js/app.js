/**
 * 文件名: app.js
 * 用途: 应用程序主入口
 * 描述: 包含核心业务逻辑，包括：
 *       1. 初始化应用 (init)
 *       2. 从 Supabase 获取数据
 *       3. 渲染球员卡片 (renderCards)
 *       4. 处理模拟数据回退
 */
// app.js - 主程序逻辑

const client = supabase.createClient(NBA_CONFIG.SUPABASE_URL, NBA_CONFIG.SUPABASE_KEY);
let allPlayersData = [];

// 🟢 1. 初始化
async function init() {
    // 自动检测系统深色模式偏好
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    // 🔴 关键修改：只在“球员”页面加载数据
    const playerContainer = document.getElementById('player-list');
    if (!playerContainer) return; // 如果当前页面没有 player-list，直接退出，不加载数据

    // 模拟加载延迟，展示骨架屏效果
    setTimeout(async () => {
        let data = [];
        if (client) {
            try {
                const res = await client.from('players').select('*').order('player_id');
                data = res.data || [];
            } catch (e) {
                console.error("加载失败:", e);
                data = getMockData();
            }
        } else {
            console.log("⚠️ 使用模拟数据展示设计效果");
            data = getMockData();
        }

        allPlayersData = data;
        fillDropdown(data);
        renderCards(data);
    }, 800);
}

// 🟢 2. 渲染卡片
function renderCards(players) {
    const container = document.getElementById('player-list');
    container.innerHTML = '';

    if (players.length === 0) {
        container.innerHTML = '<div style="text-align:center; width:100%; grid-column: 1/-1; color:var(--text-secondary)">No players found.</div>';
        return;
    }

    players.forEach(player => {
        const div = document.createElement('div');
        div.className = 'card';
        const imgUrl = `https://cdn.nba.com/headshots/nba/latest/1040x760/${player.player_id}.png`;

        div.innerHTML = `
            <img class="avatar" src="${imgUrl}" loading="lazy" 
                 onerror="this.src='https://cdn.nba.com/headshots/nba/latest/1040x760/logoman.png'">
            <div class="info">
                <div class="name">${player.full_name}</div>
                <span class="team-badge">${player.team_name}</span>
            </div>
        `;
        container.appendChild(div);
    });
}

// 🟢 3. 辅助功能
function fillDropdown(players) {
    const teams = [...new Set(players.map(p => p.team_name))].sort();
    const select = document.getElementById('teamSelect');
    select.innerHTML = '<option value="all">All Teams</option>';

    teams.forEach(team => {
        const option = document.createElement('option');
        option.value = team;
        option.textContent = team;
        select.appendChild(option);
    });
}

// 🟢 4. 数据过滤 (供 search.js 调用)
window.filterData = function (search, team) {
    const filtered = allPlayersData.filter(p => {
        const matchName = p.full_name.toLowerCase().includes(search);
        const matchTeam = team === 'all' || p.team_name === team;
        return matchName && matchTeam;
    });
    renderCards(filtered);
};

// 模拟数据
function getMockData() {
    return [
        { player_id: 2544, full_name: "LeBron James", team_name: "Lakers" },
        { player_id: 201939, full_name: "Stephen Curry", team_name: "Warriors" },
        { player_id: 201142, full_name: "Kevin Durant", team_name: "Suns" },
        { player_id: 1629029, full_name: "Luka Doncic", team_name: "Mavericks" },
        { player_id: 203999, full_name: "Nikola Jokic", team_name: "Nuggets" },
        { player_id: 1630162, full_name: "Anthony Edwards", team_name: "Timberwolves" },
    ];
}

// 启动
init();
