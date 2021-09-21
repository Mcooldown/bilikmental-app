interface gapProps {
     width?: number,
     height?: number,
}

const Gap = (props: gapProps) => {
     return (
          <div style={{ width: props.width, height: props.height }}>
          </div>
     )
}

export default Gap
