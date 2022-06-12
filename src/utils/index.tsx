export const switchBgColor = (day: number) => {
  switch (day) {
    case 0:
      return "bg-red-300"
    case 1:
      return "bg-yellow-300"
    case 2:
      return "bg-pink-300"
    case 3:
      return "bg-green-300"
    case 4:
      return "bg-orange-300"
    case 5:
      return "bg-blue-300"
    case 6:
      return "bg-purple-300"
    default:
      return "bg-red-300"
  }
}
