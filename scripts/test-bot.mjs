// Checks that typo-ridden questions still reach the right answer.  npm run test:bot
import { reply } from '../src/bot/brain.js'
const cases = [
  ['hellooo', 'greet'], ['hi there', 'greet'], ['good morning!', 'greet'],
  ['how ar you', 'howareyou'], ['hows it going', 'howareyou'], ['whats up', 'howareyou'],
  ['thnks', 'thanks'], ['webale', 'thanks'], ['bye bye', 'bye'],
  ['who r u', 'bot'], ['are you a real person?', 'bot'], ['tell me a joek', 'joke'], ['animal joke', 'joke'], ['a different kind', 'jokekind'], ['favourite colour?', 'colour'], ['whats your favourite movie', 'fallback'],
  ['tel me abot martha', 'about'], ['who is martha', 'about'],
  ['waht servcies do you ofer', 'services'], ['what can you do', 'services'],
  ['are you availabel for freelance', 'hire'], ['i want to hire you', 'hire'],
  ['how much do you chrage', 'price'], ['whats your pricing', 'price'],
  ['how long does a website take', 'time'],
  ['what tech stack do you use', 'skills'], ['do you know reactt', 'skills'],
  ['do you do netwroking', 'network'], ['vlans?', 'network'], ['server automation', 'network'],
  ['show me your work', 'work'], ['portfollio', 'work'],
  ['link guardain', 'linkguardian'], ['voicless shelter', 'shelter'], ['docere foundation', 'docere'], ['nasa project', 'galaxy'],
  ['storeis', 'stories'], ['what have you writen on wattpad', 'stories'],
  ['do you draw', 'art'], ['animation', 'art'],
  ['where do you studdy', 'education'], ['internship experience', 'experience'],
  ['how do i contact you', 'contact'], ['email', 'contact'], ['whats your phone number', 'contact'],
  ['where are you based', 'location'], ['can i see your cv', 'cv'], ['resume', 'cv'],
  ['how was this site built', 'site'], ['i love this site', 'love'], ['how old are you', 'private'],
  ['do you work remotely', 'faq:remote'], ['asdfghjk', 'fallback'], ['the weather in paris', 'fallback'],
]
let fails = 0
for (const [q, want] of cases) {
  const r = reply(q)
  const ok = r.intent === want
  if (!ok) fails++
  console.log(ok ? '✓' : '✗', q.padEnd(40), '→', r.intent, ok ? '' : `(wanted ${want})`)
}
console.log(`\n${cases.length - fails}/${cases.length} passed`)
if (fails) process.exit(1)
