// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT MODIFY.

import SrspoaBank from './srspoa.bank'
import SrspoaCrisis from './srspoa.crisis'
import SrspoaSrsevidence from './srspoa.srsevidence'
import SrspoaSrslashing from './srspoa.srslashing'
import SrspoaSrsmint from './srspoa.srsmint'
import SrspoaSrstaking from './srspoa.srstaking'
import SrspoaSrvault from './srspoa.srvault'


export default { 
  SrspoaBank: load(SrspoaBank, 'srspoa.bank'),
  SrspoaCrisis: load(SrspoaCrisis, 'srspoa.crisis'),
  SrspoaSrsevidence: load(SrspoaSrsevidence, 'srspoa.srsevidence'),
  SrspoaSrslashing: load(SrspoaSrslashing, 'srspoa.srslashing'),
  SrspoaSrsmint: load(SrspoaSrsmint, 'srspoa.srsmint'),
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