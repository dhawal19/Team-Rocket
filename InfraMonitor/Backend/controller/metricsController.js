import axios from "axios";

const getMetrics = async (req, res) => {
    try{
        const response  = await axios.get(`${process.env.PROMETHEUS_URL}/api/v1/query`, {
            params: {
                query: 'up'
            }
        });
        
        const data = response.data.data.result;
        const metrics = data.map((metric) => {
            return {
                metric: metric.metric,
                value: metric.value
            };
        });
        res.json(metrics);
    }
    catch(error){
        res.status(500).send('Prometheus Server Error');
    }
}

export default getMetrics;