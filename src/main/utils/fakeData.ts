import { faker } from '@faker-js/faker'

function gerarCpf () {
  const num1 = aleatorio() // aleatorio já devolve string, logo não precisa de toString
  const num2 = aleatorio()
  const num3 = aleatorio()

  const dig1 = dig(num1, num2, num3) // agora só uma função dig
  const dig2 = dig(num1, num2, num3, dig1) // mesma função dig aqui

  // aqui com interpolação de strings fica bem mais legivel
  return `${num1}.${num2}.${num3}-${dig1}${dig2}`
}

// o quarto parametro(n4) só será recebido para o segundo digito
function dig (n1, n2, n3, n4) {
  // as concatenações todas juntas uma vez que são curtas e legíveis
  const nums = n1.split('').concat(n2.split(''), n3.split(''))

  if (n4 !== undefined) { // se for o segundo digito coloca o n4 no sitio certo
    nums[9] = n4
  }

  let x = 0

  // o j é também iniciado e incrementado no for para aproveitar a própria sintaxe dele
  // o i tem inicios diferentes consoante é 1º ou 2º digito verificador
  for (let i = (n4 !== undefined ? 11 : 10), j = 0; i >= 2; i--, j++) {
    x += parseInt(nums[j]) * i
  }

  const y = x % 11
  // ternário aqui pois ambos os retornos são simples e continua legivel
  return y < 2 ? 0 : 11 - y
}

function aleatorio () {
  const aleat = Math.floor(Math.random() * 999)
  // o preenchimento dos zeros à esquerda é mais facil com a função padStart da string
  return ('' + aleat).padStart(3, '0')
}

export const fakeData = () => {

  for (let i = 0; i < 10; i++) {
    const cpf = gerarCpf()
    const name = faker.name.fullName()
    const phone = faker.phone.number('31#########')
    const address = faker.address.streetAddress()
    const insertCostumer = `insert into costumer values ('${cpf}','${name}','${address}','${phone}')`
    console.log(insertCostumer)
  }
}
