export const dateSetter = (value) => {
    if (value) {
        const months = [
            'янв',
            'фев',
            'мар',
            'апр',
            'мая',
            'июн',
            'июл',
            'авг',
            'сен',
            'окт',
            'ноя',
            'дек',
        ]
        const formatDate = value.split("-").reverse().join("-")
        const time = new Date(formatDate)
        const date = time.getDate()
        const month = time.getMonth()
        const day = time.getDay()
        const monthName = months[month]
        return `${date} ${monthName}, ${day}`
    }
}