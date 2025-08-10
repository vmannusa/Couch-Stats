import React, { useRef, useState, useEffect } from 'react';
import html2canvas from 'html2canvas';

type Sport = 'basketball'|'football'|'baseball'|'soccer';
type Theme = 'espn'|'espn-fantasy'|'yahoo';

const DEFAULT_STATS: Record<Sport, any> = {
  basketball: { minutes: 2, points: 0, fgm: 0, fga: 3, threeMade: 0, threeAtt: 1, rebounds: 0, assists:0, fouls:5 },
  football: { passY:0, rushY:0, recY:0, td:0, ints:0 },
  baseball: { ab:4, h:0, r:0, rbi:0, hr:0 },
  soccer: { mins:90, goals:0, assists:0, shots:0, yellow:0, red:0 }
};

function generateFunny(sport:Sport){
  const r = Math.random;
  if(sport==='basketball'){
    return {
      minutes: Math.floor(r()*6),
      points: Math.floor(r()*5),
      fga: Math.floor(r()*6),
      fgm: Math.floor(r()*3),
      threeAtt: Math.floor(r()*3),
      threeMade: Math.floor(r()*1.5),
      rebounds: Math.floor(r()*8),
      assists: Math.floor(r()*5),
      fouls: Math.floor(r()*5)
    };
  } else if(sport==='football'){
    return { passY: Math.floor(r()*350), rushY: Math.floor(r()*120), recY: Math.floor(r()*150), td: Math.floor(r()*4), ints: Math.floor(r()*2) };
  } else if(sport==='baseball'){
    return { ab: 4, h: Math.floor(r()*4), r: Math.floor(r()*3), rbi: Math.floor(r()*4), hr: Math.floor(r()*2) };
  } else {
    return { mins: 90, goals: Math.floor(r()*3), assists: Math.floor(r()*2), shots: Math.floor(r()*6), yellow: Math.floor(r()*2), red: Math.floor(r()*1) };
  }
}

export default function App(){
  const [sport, setSport] = useState<Sport>('basketball');
  const [theme, setTheme] = useState<Theme>('espn');
  const [name, setName] = useState('Victor Mann');
  const [team, setTeam] = useState('Couch Crew');
  const [imgData, setImgData] = useState<string|undefined>(undefined);
  const [stats, setStats] = useState<any>(DEFAULT_STATS['basketball']);
  const previewRef = useRef<HTMLDivElement|null>(null);

  useEffect(()=>{
    // if url has data param, load it
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get('data');
    if(encoded){
      try{
        const decoded = JSON.parse(atob(decodeURIComponent(encoded)));
        if(decoded.sport) setSport(decoded.sport);
        if(decoded.theme) setTheme(decoded.theme);
        if(decoded.name) setName(decoded.name);
        if(decoded.team) setTeam(decoded.team);
        if(decoded.stats) setStats(decoded.stats);
      }catch(e){
        console.warn('Failed to parse shared data', e);
      }
    }
  },[]);

  function onFile(e:React.ChangeEvent<HTMLInputElement>){
    const f = e.target.files?.[0];
    if(!f) return;
    const url = URL.createObjectURL(f);
    setImgData(url);
  }

  function randomize(){
    const s = generateFunny(sport);
    setStats(s);
  }

  function updateStat(key:string, value:string){
    setStats((st:any)=> ({...st, [key]: isNaN(Number(value))? value : Number(value)}));
  }

  async function exportImage(){
    if(!previewRef.current) return;
    const canvas = await html2canvas(previewRef.current, {backgroundColor: null, scale: 2});
    const data = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = data;
    a.download = `${name.replace(/\s+/g,'_')}_stat.png`;
    a.click();
  }

  function copyLink(){
    const payload = { sport, theme, name, team, stats };
    const encoded = encodeURIComponent(btoa(JSON.stringify(payload)));
    const url = `${location.origin}${location.pathname}?data=${encoded}`;
    navigator.clipboard.writeText(url);
    alert('Link copied to clipboard — share it with friends!');
  }

  const accent = theme==='espn' ? 'var(--accent1)' : theme==='espn-fantasy' ? 'var(--accent2)' : 'var(--accent3)';

  return (
    <div className="app">
      <div className="panel">
        <h3>Couch Stats</h3>
        <div className="small">Sport</div>
        <select value={sport} onChange={e=>{ const s=e.target.value as Sport; setSport(s); setStats(DEFAULT_STATS[s]); }}>
          <option value="basketball">Basketball</option>
          <option value="football">Football</option>
          <option value="baseball">Baseball</option>
          <option value="soccer">Soccer</option>
        </select>

        <div className="small">Theme</div>
        <select value={theme} onChange={e=> setTheme(e.target.value as Theme)}>
          <option value="espn">ESPN-like</option>
          <option value="espn-fantasy">ESPN Fantasy-like</option>
          <option value="yahoo">Yahoo Fantasy-like</option>
        </select>

        <div className="small">Name</div>
        <input type="text" value={name} onChange={e=>setName(e.target.value)} />

        <div className="small">Team (optional)</div>
        <input type="text" value={team} onChange={e=>setTeam(e.target.value)} />

        <div className="small">Photo</div>
        <input type="file" accept="image/*" onChange={onFile} />

        <div style={{display:'flex', gap:8, marginTop:8}}>
          <button onClick={randomize}>Randomize</button>
          <button onClick={exportImage} style={{background:accent}}>Download Image</button>
          <button onClick={copyLink}>Copy Link</button>
        </div>

<div style={{marginTop:12}}>
  <div className="small">Editable stats</div>
  <div className="stat-grid">
    {Object.keys(stats).map((k)=>(
      <div className="stat" key={k}>
        <div style={{textTransform:'uppercase', fontSize:12}}>{k}</div>
        <div>
          <input type="text" value={stats[k]} onChange={e=>updateStat(k,e.target.value)} style={{width:64}} />
        </div>
      </div>
    ))}
  </div>
</div>

    
      <div>
        <div className="panel card-preview" ref={previewRef as any} style={{padding:20}}>
          <div style={{borderLeft:`6px solid ${accent}`, paddingLeft:12}}>
            <div className="preview-top">
              <div className="preview-photo">
                {imgData ? <img src={imgData} style={{width:'100%',height:'100%',objectFit:'cover'}}/> : null}
              </div>
              <div>
                <div style={{fontSize:20, fontWeight:700}}>{name}</div>
                <div className="small">{team} · {sport.toUpperCase()}</div>
              </div>
            </div>

            <div>
              <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
                {Object.keys(stats).map((k)=>(
                  <div key={k} style={{minWidth:120, padding:8, background:'#fafafa', borderRadius:8, marginBottom:8}}>
                    <div style={{fontSize:11, color:'#666'}}>{k.toUpperCase()}</div>
                    <div style={{fontWeight:700, fontSize:18}}>{String(stats[k])}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="watermark">For entertainment only — Couch Stats</div>
          </div>
        </div>
        <div style={{marginTop:8}} className="small">Preview — use "Download Image" to export a PNG or "Copy Link" to share a reproducible link.</div>
      </div>
    </div>
  );</div>)}