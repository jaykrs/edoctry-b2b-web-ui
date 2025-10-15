import React from 'react'

interface Props {
  onBack: () => void;
}

function PreviewandPublish({ onBack }: Props) {
  return (
    <div>
      <h2>Preview and Publish</h2>
      <button onClick={onBack}>Back</button>
      <button>Publish</button>
    </div>
  )
}

export default PreviewandPublish