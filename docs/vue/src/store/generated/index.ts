// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT MODIFY.

import SrspoaBank from './srspoa.bank'
import SrspoaCrisis from './srspoa.crisis'
import SrspoaEvidence from './srspoa.evidence'
import SrspoaMint from './srspoa.mint'
import SrspoaSlashing from './srspoa.slashing'
import SrspoaSrstaking from './srspoa.srstaking'
import SrspoaSrvault from './srspoa.srvault'


export default { 
  SrspoaBank: load(SrspoaBank, 'srspoa.bank'),
  SrspoaCrisis: load(SrspoaCrisis, 'srspoa.crisis'),
  SrspoaEvidence: load(SrspoaEvidence, 'srspoa.evidence'),
  SrspoaMint: load(SrspoaMint, 'srspoa.mint'),
  SrspoaSlashing: load(SrspoaSlashing, 'srspoa.slashing'),
  SrspoaSrstaking: load(SrspoaSrstaking, 'srspoa.srstaking'),
  SrspoaSrvault: load(SrspoaSrvault, 'srspoa.srvault'),
  
}


function load(mod, fullns) {
    return function init(store) {        
        if (store.hasModule([fullns])) {
            throw new Error('Duplicate module name detected: '+ fullns)
        }else{
            store.registerModule([fullns], mod)
            store.subscribe((mutation) => {
                if (mutation.type == 'common/env/INITIALIZE_WS_COMPLETE') {
                    store.dispatch(fullns+ '/init', null, {
                        root: true
                    })
                }
            })
        }
    }
}