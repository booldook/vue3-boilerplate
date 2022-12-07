# ES6 일부정리

```js

//# Short circuit
//## || 연산자
//? 왼쪽 값이 True 하면 왼쪽 값을 리턴한다.
//? 왼쪽 값이 False 하면 오른쪽 값을 리턴한다.
return fish || 'Empty Name' // 'fish' or 'Empty Name'

return false || 'hello' // 'hello'
return '' || 'hello' // 'hello'

return '트루' || 'hello' // '트루'
return 1 || 'hello' // 1

return 'hello1' || false // 'hello1'
return 'hello2' || NaN  // 'hello2'

return null && false // false
return undefined || null // null

let a
let b = null
let c = undefined
let d = 4
let e = 'five'

const f = a || b || c || d || e // null, undefiend, 빈값은 false


//# Short circuit
//## && 연산자
//? 왼쪽 값이 Truthy 하면 오른쪽 값이 리턴된다. 만일 오른쪽 값이 없으면 undefined나 null
//? 왼쪽 값이 Falsy 면 왼쪽 값이 리턴된다.
return true && "hello" // 'hello'
return null && undefined // null
return undefined && "hello" // undefined
return "hello" && null // null
return "hello" && "bye" // bye
return null && "hello" // null
return undefined && "hello" // undefined


// # Nullish Coalescing Operator - 거짓의 판단을 유연하게 판단. 그냥 심플하게 값이 있고 없고로 판단
return a = null ?? 'hello'  // 'hello'
return b = '' ?? true  // ''
return c = false ?? true  // false
return d = 0 ?? 1  // 0
return e = undefined ?? 'world'  // 'world'


//# Logical Operators and Assignment Expressions 
//? [ &&=, ||= ] 위의 Short circuit 단축평가 ||, && 의 연산자의 += *= 같은 버젼
oldName && (oldName = newName)  // && 연산자를 활용한 값 대입
oldName &&= newName  // Logical Operators and Assignment Expressions (&&) 를 통한 값 대입

oldName || (oldName = newName)  // && 연산자를 활용한 값 대입
oldName ||= newName  // Logical Operators and Assignment Expressions (||) 를 통한 값 대입


//# Logical nullish assignment
//? [ ??= x ] ??= y 에서 x가 null 이나 undefined 일 경우 y를 대입
const a = { duration: 50 }

a.duration = a.duration ?? 10
a.duration ??= 10 // 단축버전 :: a의 속성에 duration 속성이 있으니 10은 무시
console.log(a.duration) // expected output: 50

a.speed ??= 25 // a의 속성에 speed 라는 키가 없으니 25가 들어감
console.log(a.speed) // expected output: 25


//# String padding
//? 문자열 끝 부분이나 시작 부분을 다른 문자열로 채워 주어진 길이를 만족하는 새로운 문자열을 만들어낼 수 있다.
"hello".padStart(6) // " hello"
"hello".padEnd(6) // "hello "
"hello".padStart(3) // "hello" // 문자열 길이보다 목표 문자열 길이가 짧다면 채워넣지 않고 그대로 반환
"hello".padEnd(20, "*") // "hello***************" // 사용자가 지정한 값으로 채우는 것도 가능


//# Array.prototype.flat()
//? 중첩 배열 삭제 / 빈공간 삭제 / 중첩 다차원 배열 평평하게
const array = [1, [2, 3], [4, 5]]
array.flat(1) // 결과 : [1,2,3,4,5]

const entries = ["bob", "sally", , , , , , , , "cindy"]
entries.flat() // 결과 ['bob', 'sally', 'cindy'] 데이터 정리도 됨

['Dog', ['Sheep', 'Wolf']].flat()  // [ 'Dog', 'Sheep', 'Wolf' ]


//# Array.prototype.flatMap()
let arr1 = ["it's Sunny in", "", "California"]
arr1.map(x => x.split(" "))  // [["it's","Sunny","in"],[""],["California"]]
arr1.flatMap(x => x.split(" "))  // ["it's","Sunny","in", "", "California"]


//# Array.prototype.at()
//? at() 함수를 사용하여 양수 및 음수 인덱스를 모두 사용하여 문자열을 인덱싱할 수 있다.
const arrays = ['a','b','c','d']
console.log(arrays.at(-1))  // 'd


//# Optional chaining
//?  ?. 문법
//?  프로퍼티가 없는 중첩 객체를 에러 없이 안전하게 접근할 수 있다
//?  ?.은 ?.'앞’의 평가 대상이 undefined나 null이면 평가를 멈추고 undefined를 반환. 평가대상이 true이면 쭉쭉 이어나가 최종값을 반환

const person1 = {
  name: 'Ellie',
  job: {
    title: 'S/W Engineer',
    manager: {
      name: 'Bob',
    },
  },
}
const person2 = {
  name: 'Bob',
}

function printManager(person) { // 중첩 객체의 값을 불러오는 함수
  console.log(person.job.manager.name)
}
printManager(person1) // Bob
printManager(person2) // 에러


function printManager(person) {
  console.log(person.job && person.job.manager && person.job.manager.name)
}
printManager(person1) // Bob
printManager(person2) // undefined


function printManager(person) {
  console.log(person?.job?.manager?.name)
}
printManager(person1) // Bob
printManager(person2) // undefined

//##  ?.()  :: 함수접근
let user1 = {
  admin() {
    alert("관리자 계정입니다.")
  }
}
let user2 = {}

user1.admin?.() // 관리자 계정입니다.
user2.admin?.() // undefined


//##  ?.[]  :: 키접근
let user3 = { firstName: "Violet" }
let user4 = null // user4는 권한이 없는 사용자라고 가정해봅시다.
let key = "firstName"

user3 ?.[key] // Violet
user4 ?.[key] // undefined
user3 ?.[key] ?. something ?. not ?. existing // undefined

delete user4 ?. name // user4가 존재하면 user4.name을 삭제합니다.
```
