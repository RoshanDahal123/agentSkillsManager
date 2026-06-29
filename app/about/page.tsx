import formatDate from "../__lib/format-date"

const page = () => {
  const date=formatDate(new Date('2059/10/08'))
  return (
    <div>
      <h1>About Us</h1>
      <p>This is the about page.</p>
      <p>Current date: {date}</p>
    </div>
  )
}

export default page