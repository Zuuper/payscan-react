import React from 'react';
import Header from '../fragments/header'
import { withRouter } from "react-router";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import CreateStockOpname from '../fragments/createStockOpname'
import StockOpnameMenu from '../fragments/stockOpnameMenu'
import { Switch, Route} from "react-router-dom"


class StockOpname extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            Data: []
        }
    }
    render() {
        // if(window.sessionStorage.getItem('StockOpnameID')){
        //     return <Redirect to='list/createStockOpname' />
        // }
        const { match } = this.props;
        return (
            <main>
                <section>
                    <Header titleHeader="Stock Opname" username={sessionStorage.getItem('nama_pegawai')} />
                </section>
                <section>
                    
                    <Switch>
                        <Route exact path={`${match.path}`} component={StockOpnameMenu} />
                        <Route path={`${match.path}/createStockOpname`} component={CreateStockOpname} />
                    </Switch>
                </section>
                
            </main>
        )
    }
}

export default withRouter(StockOpname);