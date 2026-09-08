const allowedFilters=new Set(['text','stage','locale','mediaType','rightsStatus','tags']);
export function validateCorpus(records){
 const errors=[],ids=new Set,stats={total:Array.isArray(records)?records.length:0,synthetic:0,rightsLabelled:0};
 if(!Array.isArray(records))return{valid:false,errors:[{code:'TYPE',path:'$'}],stats};
 records.forEach((r,i)=>{
  if(!r.id||ids.has(r.id))errors.push({code:'DUPLICATE_ID',path:`$[${i}].id`});
  ids.add(r.id);
  if(r.synthetic!==true)errors.push({code:'SYNTHETIC_REQUIRED',path:`$[${i}].synthetic`});else stats.synthetic++;
  if(r.rights?.license!=='CC-BY-4.0'||r.rights?.source!=='authored-synthetic'||r.rights?.status!=='cleared-synthetic')errors.push({code:'RIGHTS_LABEL',path:`$[${i}].rights`});else stats.rightsLabelled++;
  if(!r.title||!r.stage||!r.locale||!r.mediaType||!Array.isArray(r.tags))errors.push({code:'FIELDS',path:`$[${i}]`});
 });
 return{valid:errors.length===0,errors,stats};
}
export function queryCorpus(records,filters={}){const unknown=Object.keys(filters).filter(k=>!allowedFilters.has(k));if(unknown.length)throw new Error(`UNKNOWN_FILTER: ${unknown.join(',')}`);const check=validateCorpus(records);if(!check.valid)throw new Error('INVALID_CORPUS');const text=String(filters.text??'').toLocaleLowerCase(),tags=filters.tags??[];return records.filter(r=>(!text||`${r.id} ${r.title} ${r.description} ${r.tags.join(' ')}`.toLocaleLowerCase().includes(text))&&(!filters.stage||r.stage===filters.stage)&&(!filters.locale||r.locale===filters.locale)&&(!filters.mediaType||r.mediaType===filters.mediaType)&&(!filters.rightsStatus||r.rights.status===filters.rightsStatus)&&(!tags.length||tags.every(t=>r.tags.includes(t)))).sort((a,b)=>a.id.localeCompare(b.id)).map(r=>structuredClone(r))}
