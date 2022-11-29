export const tempFormat = (temp: number): string => {
   const tempFormated = Math.round(temp)
   if (tempFormated > 0) return "+" + tempFormated + "°C"
   return tempFormated + "°C"
}
