import React, {useState, useEffect} from 'react'
import { getUserStats } from '../firebaseUtils'
import HeaderView from '../views/headerView'
import StatView from '../views/statView'

function HeaderPresenter(props) {
    const [statView, setStatView] = useState()
    const [data, setData] = useState()

    useEffect(() => {
        if (statView) {
            getUserStats().then(data => {
                const stats = data.stats.map(x => x ? x : 0)
                const numLost = data.numLost ? numLost : 0
                setData({stats: stats, numLost: numLost})
            })
        }
    }, [statView])

    return <div style={{width: "100%"}}>
        <HeaderView redirect={() => setStatView(!statView)} statView={statView}/>
        {statView && data ? <StatView stats={data.stats} numLost={data.numLost} redirect={() => setStatView(false)}/> : null}
    </div>
}

export default HeaderPresenter