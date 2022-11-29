export const getSavedCities = (): Array<string> | null => {
   const data = localStorage.getItem("savedCities")
   if (data) {
      return JSON.parse(data)
   }

   return null
}
