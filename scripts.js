const GAS_API_URL = 'https://script.google.com/macros/s/AKfycbzwXfWlFMe0nzcHPQiFHuC1_ptlz27b0efeSm6WwLNyy6XmLXLrrEzv3BhA3-7YiNeiMA/exec'

const statusCard = document.getElementById('status-card');
const statusText = document.getElementById('status-text');
const statusComment = document.getElementById('status-comment');
const updatedAtEl = document.getElementById('updated-at');
const reloadBtn = document.getElementById('reload-btn');

function getStatusKey(status){
    if (status.includes('空')) return 'empty';
    if (status.includes('混雑')) return 'moderate';
    if (status.includes('満員')) return 'full';
    return 'unknown';
}

async function fetchCrowdStatus(){
    console.log('1 fetch開始:', GAS_API_URL);

    if (!GAS_API_URL || GAS_API_URL.startsWith('ここに')){
	statusText.textContent = 'URL未設定';
	statusComment.textContent = 'scripts.jsのGAS_API_URLにデプロイURLを設定してください。'
	reutrn;
    }
    
    reloadBtn.disabled = true;
    reloadBtn.textContent = '更新中...';

    try{
	const url = `${GAS_API_URL}?t=${Date.now()}`; // キャッシュ防止
	const response = await fetch(url);
	if (!response.ok){
	    throw new Error(data.error || 'データの取得に失敗しました');
	}

	const data = await response.json();
	if (!data.ok || !data.current){
	    throw new Error(data.error || 'データの取得に失敗しました');
	}

	const { status, comment, updatedAt } = data.current;

	statusText.textContent = status || '未設定';
	statusCard.dataset.status = getStatusKey(status || '');
	statusComment.textContent = comment || '';
	updatedAtEl.textContent = updatedAt || '未更新';
    }catch(error){
	console.error(error);
	statusText.textContent = '取得エラー';
	statusCard.dataset.status = 'unknown';
	statusComment.textContent = '最新情報の取得に失敗しました。'
    }finally{
	reloadBtn.disabled = false;
	reloadBtn.textContent = '最新の情報に更新';
    }
}

reloadBtn.addEventListener('click', fetchCrowdStatus);

fetchCrowdStatus();
