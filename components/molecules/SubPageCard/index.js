import React, { Fragment } from 'react'
import Button from "../../atoms/Button"
import Gap from "../../atoms/Gap"

const SubPageCard = (props) => {

     const {options, selectedOption, handleSetCategory} = props;
     return (
          <div className="card-shadow px-6 py-8 flex">
               {
                    options && options.map((option, index) => {
                         return (
                              <Fragment key={option}>
                                   {index > 0 && <Gap width={10} />}
                                   <Button type={option === selectedOption ? 2 : 1} title={option} onClick={() => handleSetCategory(option)} />
                              </Fragment>
                         )
                    })
               }
          </div>
     )
}

export default SubPageCard
