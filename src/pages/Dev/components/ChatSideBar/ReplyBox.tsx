const ReplyBox = ({ userName }: { userName: string }) => {
  return (
    <span
      style={{
        display: 'inline-block',
        color: '#0077b8',
        marginRight: '4px',
      }}
    >
      @{userName}
    </span>
  )
}

export default ReplyBox
