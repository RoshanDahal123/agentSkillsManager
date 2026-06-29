export default function formatDate(date: Date):string{
    const dateString = date.toLocaleDateString('en-US', {
        year:'numeric',
        month:'long',
        day:'numeric'
    })
    return dateString;
}