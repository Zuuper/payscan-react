import React from 'react'
import { Switch, Route, NavLink } from "react-router-dom"
import { withRouter } from "react-router";
import './components/css/main.css';
import Logo from './assets/logo-small.png';
import Inventory from './assets/icons/inventory.png';
import Product from './assets/icons/product.png';
import Promotion from './assets/icons/loyalty.png';
import Customer from './assets/icons/people_black.png';
import Report from './assets/icons/text_snippet.png';
import Purchase from './assets/icons/delivery_time.png';
import StockOpname from './assets/icons/document_folder.png';
import InventoryContent from './components/content/Inventory'
import ProductContent from './components/content/Product'
import PromotionContent from './components/content/Promotion'
import CustomerContent from './components/content/Customer'
import ReportContent from './components/content/Report'
import PurchaseContent from './components/content/Purchase'
import StockOpnameContent from './components/content/StockOpname'


class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoggedOut: false
        }
    }
    render() {
        const { match } = this.props;
        return (
            <div class="container-fluid">
                
                <div class="row vh-100">
                    <div class="col-2 bg-primary pt-5">
                        <aside>
                            {/* div untuk logo */}
                            <div class="d-flex justify-content-start align-items-center">
                                <img src={Logo} class="d-block" alt="Logo Icon" />
                                <h1 id="title-sidebar" class="ml-4">PayScan</h1>
                            </div>
                            {/* div untuk nyimpen routing */}
                            <div class="mt-5 pt-4">
                                <NavLink exact to={`${match.path}/inventory`} className="d-flex justify-content-start align-items-center my-4 sidebar-link">
                                        <img src={Inventory} class="d-block ml-1 mr-3" alt="Inveontory Icon" />
                                        <p class="text-white">Inventory</p>
                                </NavLink>
                                <NavLink exact to={`${match.path}/stockOpname/list`} className="d-flex justify-content-start align-items-center my-4 sidebar-link">
                                        <img src={StockOpname} class="d-block ml-1 mr-3" alt="Stock Opname Icon" />
                                        <p class="text-white">Stock Opname</p>
                                </NavLink>
                                <NavLink exact activeStyle={{fontWeight: "bold",color: "red"}} to={`${match.path}/product`} className="d-flex justify-content-start align-items-center my-4 sidebar-link">
                                        <img src={Product} class="d-block ml-1 mr-3" alt="Product Icon" />
                                        <p class="text-white">product</p>
                                </NavLink >
                                <NavLink exact activeStyle={{fontWeight: "bold",color: "red"}} to={`${match.path}/purchase`} className="d-flex justify-content-start align-items-center my-4 sidebar-link">
                                        <img src={Purchase} class="d-block ml-1 mr-3" alt="Purchase Icon" />
                                        <p class="text-white">Purchase</p>
                                </NavLink >
                                <NavLink exact to={`${match.path}/promotion`} activeClassName="active" className="d-flex justify-content-start align-items-center my-4 sidebar-link">
                                        <img src={Promotion} class="d-block ml-1 mr-3" alt="Promotion Icon" />
                                        <p class="text-white">Promotion</p>
                                </NavLink>
                                <NavLink exact to={`${match.path}/customer`} activeClassName="active" className="d-flex justify-content-start align-items-center my-4 sidebar-link">
                                        <img src={Customer} class="d-block ml-1 mr-3" alt="Customer Icon" />
                                        <p class="text-white">Customer</p>
                                </NavLink>
                                <NavLink exact to={`${match.path}/report`} activeClassName="active" className="d-flex justify-content-start align-items-center my-4 sidebar-link">
                                        <img src={Report} class="d-block ml-1 mr-3" alt="Report Icon" />
                                        <p class="text-white">Report</p>
                                </NavLink>
                            </div>
                        </aside>

                    </div>
                    <div className="content col-10 pt-5 px-5">
                        <Switch>
                            <Route path={`${match.path}/inventory`} component={InventoryContent} />
                            <Route path={`${match.path}/stockOpname/list`} component={StockOpnameContent} />
                            <Route path={`${match.path}/product`} component={ProductContent} />
                            <Route path={`${match.path}/purchase`} component={PurchaseContent} />
                            <Route path={`${match.path}/promotion`} component={PromotionContent} />
                            <Route path={`${match.path}/customer`} component={CustomerContent} />
                            <Route exact path={`${match.path}/report`} component={ReportContent} />
                        </Switch>
                    </div>
                </div>
            </div>

        )
    }
}

export default withRouter(Dashboard);