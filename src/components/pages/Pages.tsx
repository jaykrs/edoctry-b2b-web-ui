import React from 'react';
import PageBody from '@/components/pagenew/PageBody';
import PageHeader from '@/components/pagenew/PageHeader';
import PageFooter from '@/components/pagenew/PageFooter';
import PagePreview from '../pagenew/PagePreview';

function Pages() {
  return (
<div className='flex-col space-y-4 p-4'>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
      <div className="w-full"><PageBody /></div>
      <div className="w-full"><PageHeader /></div>
      <div className="w-full"><PageFooter /></div>
    </div>
    <div className="w-full"><PagePreview /></div>

</div>
  );
}

export default Pages;
