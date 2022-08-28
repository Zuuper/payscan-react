import React from 'react'
import ReportCard from './reportCard'
import ReportService from '../../services/ReportService'
class ReportSummary extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Summary: []
        }
    }
    componentDidMount() {
        ReportService.getSummary().then((res) => {
            this.setState({ Summary: res.data.data });
        });
    }
    render() {
        return (
            <main class="row d-flex justify-content-center mt-5">
                {Object.keys(this.state.Summary).map((key, index) => (
                        <div class="col-3 d-flex justify-content-center">
                            <ReportCard ReportTitle={key} SummaryReport={this.state.Summary[key]} Description={'total ' + key}>
                            </ReportCard>
                        </div>
                    ))
                }
            </main>
        )
    }
}

export default ReportSummary