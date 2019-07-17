
// let aM = dataSource.filter((data) => {
//     return data.date.split("").slice(0, 4).join('') === '2017' && data.date.split("").slice(5, 7).join('') === '09'
// })
// let bM = dataSource.filter((data) => {
//     return data.date.split("").slice(0, 4).join('') === '2017' && data.date.split("").slice(5, 7).join('') === '11'
// })
// let cM = dataSource.filter((data) => {
//     return data.date.split("").slice(0, 4).join('') === '2017' && data.date.split("").slice(5, 7).join('') === '12'
// })
// let tmpData = [];
// tmpData.push(aM);
// tmpData.push(bM);
// tmpData.push(cM);
// console.log('tmpData', tmpData);


const newData = [
    [{
            guaranteed: false,
            date: '2017/09/09',
            price: 81524,
            availableVancancy: 10,
            totalVacnacy: 164,
            status: '預定'
        },
        {
            guaranteed: false,
            date: '2017/09/25',
            price: 85223,
            availableVancancy: 3,
            totalVacnacy: 317,
            status: '截止'
        },
        {
            guaranteed: false,
            date: '2017/09/12',
            price: 70929,
            availableVancancy: 77,
            totalVacnacy: 11,
            status: '截止'
        },
        {
            guaranteed: true,
            date: '2017/09/28',
            price: 66099,
            availableVancancy: 13,
            totalVacnacy: 203,
            status: '額滿'
        },
        {
            guaranteed: true,
            date: '2017/09/29',
            price: 31202,
            availableVancancy: 63,
            totalVacnacy: 185,
            status: '截止'
        },
        {
            guaranteed: false,
            date: '2017/09/07',
            price: 96538,
            availableVancancy: 75,
            totalVacnacy: 89,
            status: '後補'
        },
        {
            guaranteed: true,
            date: '2017/09/30',
            price: 21080,
            availableVancancy: 87,
            totalVacnacy: 114,
            status: '額滿'
        },
        {
            guaranteed: true,
            date: '2017/09/18',
            price: 45209,
            availableVancancy: 41,
            totalVacnacy: 362,
            status: '額滿'
        },
        {
            guaranteed: false,
            date: '2017/09/20',
            price: 29933,
            availableVancancy: 53,
            totalVacnacy: 468,
            status: '報名'
        },
        {
            guaranteed: false,
            date: '2017/09/22',
            price: 76234,
            availableVancancy: 56,
            totalVacnacy: 49,
            status: '截止'
        },
        {
            guaranteed: true,
            date: '2017/09/25',
            price: 81920,
            availableVancancy: 12,
            totalVacnacy: 36,
            status: '額滿'
        },
        {
            guaranteed: false,
            date: '2017/09/12',
            price: 4133,
            availableVancancy: 63,
            totalVacnacy: 320,
            status: '截止'
        },
        {
            guaranteed: false,
            date: '2017/09/14',
            price: 88153,
            availableVancancy: 25,
            totalVacnacy: 156,
            status: '後補'
        },
        {
            guaranteed: true,
            date: '2017/09/04',
            price: 29321,
            availableVancancy: 2,
            totalVacnacy: 399,
            status: '預定'
        },
        {
            guaranteed: true,
            date: '2017/09/05',
            price: 18602,
            availableVancancy: 40,
            totalVacnacy: 243,
            status: '後補'
        },
        {
            guaranteed: true,
            date: '2017/09/21',
            price: 91586,
            availableVancancy: 34,
            totalVacnacy: 40,
            status: '預定'
        }
    ],
    [{
            guaranteed: true,
            date: '2017/11/23',
            price: 23525,
            availableVancancy: 92,
            totalVacnacy: 362,
            status: '報名'
        },
        {
            guaranteed: true,
            date: '2017/11/06',
            price: 17868,
            availableVancancy: 71,
            totalVacnacy: 74,
            status: '額滿'
        },
        {
            guaranteed: true,
            date: '2017/11/28',
            price: 33047,
            availableVancancy: 75,
            totalVacnacy: 4,
            status: '後補'
        },
        {
            guaranteed: true,
            date: '2017/11/21',
            price: 64973,
            availableVancancy: 55,
            totalVacnacy: 99,
            status: '後補'
        },
        {
            guaranteed: false,
            date: '2017/11/22',
            price: 89952,
            availableVancancy: 34,
            totalVacnacy: 422,
            status: '預定'
        },
        {
            guaranteed: false,
            date: '2017/11/03',
            price: 48807,
            availableVancancy: 61,
            totalVacnacy: 223,
            status: '後補'
        },
        {
            guaranteed: true,
            date: '2017/11/14',
            price: 79968,
            availableVancancy: 66,
            totalVacnacy: 299,
            status: '後補'
        },
        {
            guaranteed: true,
            date: '2017/11/29',
            price: 54513,
            availableVancancy: 37,
            totalVacnacy: 339,
            status: '預定'
        },
        {
            guaranteed: true,
            date: '2017/11/30',
            price: 94248,
            availableVancancy: 91,
            totalVacnacy: 45,
            status: '預定'
        },
        {
            guaranteed: true,
            date: '2017/11/01',
            price: 46690,
            availableVancancy: 42,
            totalVacnacy: 219,
            status: '截止'
        },
        {
            guaranteed: false,
            date: '2017/11/24',
            price: 82447,
            availableVancancy: 80,
            totalVacnacy: 336,
            status: '報名'
        },
        {
            guaranteed: false,
            date: '2017/11/04',
            price: 58280,
            availableVancancy: 84,
            totalVacnacy: 222,
            status: '截止'
        },
        {
            guaranteed: true,
            date: '2017/11/18',
            price: 46431,
            availableVancancy: 59,
            totalVacnacy: 252,
            status: '後補'
        },
        {
            guaranteed: false,
            date: '2017/11/17',
            price: 46694,
            availableVancancy: 7,
            totalVacnacy: 413,
            status: '截止'
        },
        {
            guaranteed: true,
            date: '2017/11/21',
            price: 26585,
            availableVancancy: 63,
            totalVacnacy: 229,
            status: '後補'
        },
        {
            guaranteed: false,
            date: '2017/11/19',
            price: 78689,
            availableVancancy: 47,
            totalVacnacy: 176,
            status: '後補'
        }
    ],
    [{
            guaranteed: true,
            date: '2017/12/29',
            price: 68789,
            availableVancancy: 20,
            totalVacnacy: 342,
            status: '截止'
        },
        {
            guaranteed: true,
            date: '2017/12/08',
            price: 86774,
            availableVancancy: 9,
            totalVacnacy: 460,
            status: '額滿'
        },
        {
            guaranteed: false,
            date: '2017/12/18',
            price: 80954,
            availableVancancy: 40,
            totalVacnacy: 389,
            status: '預定'
        },
        {
            guaranteed: false,
            date: '2017/12/15',
            price: 17680,
            availableVancancy: 54,
            totalVacnacy: 257,
            status: '報名'
        },
        {
            guaranteed: false,
            date: '2017/12/10',
            price: 10110,
            availableVancancy: 49,
            totalVacnacy: 90,
            status: '報名'
        },
        {
            guaranteed: false,
            date: '2017/12/04',
            price: 52386,
            availableVancancy: 67,
            totalVacnacy: 35,
            status: '報名'
        },
        {
            guaranteed: true,
            date: '2017/12/10',
            price: 84532,
            availableVancancy: 95,
            totalVacnacy: 436,
            status: '預定'
        },
        {
            guaranteed: true,
            date: '2017/12/25',
            price: 49856,
            availableVancancy: 13,
            totalVacnacy: 435,
            status: '報名'
        },
        {
            guaranteed: true,
            date: '2017/12/26',
            price: 83728,
            availableVancancy: 66,
            totalVacnacy: 309,
            status: '截止'
        },
        {
            guaranteed: true,
            date: '2017/12/03',
            price: 45516,
            availableVancancy: 16,
            totalVacnacy: 333,
            status: '報名'
        },
        {
            guaranteed: false,
            date: '2017/12/10',
            price: 17998,
            availableVancancy: 26,
            totalVacnacy: 444,
            status: '後補'
        },
        {
            guaranteed: true,
            date: '2017/12/28',
            price: 63812,
            availableVancancy: 8,
            totalVacnacy: 311,
            status: '預定'
        },
        {
            guaranteed: false,
            date: '2017/12/27',
            price: 60879,
            availableVancancy: 32,
            totalVacnacy: 384,
            status: '報名'
        },
        {
            guaranteed: false,
            date: '2017/12/12',
            price: 47321,
            availableVancancy: 38,
            totalVacnacy: 336,
            status: '預定'
        },
        {
            guaranteed: true,
            date: '2017/12/28',
            price: 45555,
            availableVancancy: 8,
            totalVacnacy: 191,
            status: '報名'
        },
        {
            guaranteed: false,
            date: '2017/12/14',
            price: 63170,
            availableVancancy: 10,
            totalVacnacy: 399,
            status: '截止'
        },
        {
            guaranteed: false,
            date: '2017/12/23',
            price: 4758,
            availableVancancy: 17,
            totalVacnacy: 78,
            status: '額滿'
        },
        {
            guaranteed: false,
            date: '2017/12/20',
            price: 18669,
            availableVancancy: 32,
            totalVacnacy: 474,
            status: '報名'
        },
        {
            guaranteed: true,
            date: '2017/12/18',
            price: 28291,
            availableVancancy: 52,
            totalVacnacy: 278,
            status: '額滿'
        },
        {
            guaranteed: false,
            date: '2017/12/18',
            price: 55201,
            availableVancancy: 61,
            totalVacnacy: 62,
            status: '後補'
        },
        {
            guaranteed: true,
            date: '2017/12/14',
            price: 92280,
            availableVancancy: 18,
            totalVacnacy: 6,
            status: '報名'
        }
    ]
]

let nnData = [];
newData.forEach((data,index)=>{
   
    console.log(newData)
})

console.log(nnData)