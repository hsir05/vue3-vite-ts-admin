<template>
  <section class="welcome">
    <Row :gutter="24" >
      <Col :span="6"  >
        <Card>
          <StatisticCountdown title="Countdown" :value="deadline" @finish="onFinish" />
        </Card>
      </Col>
      <Col :span="6">
        <Card>
          <StatisticCountdown title="Million Seconds" :value="deadline" format="HH:mm:ss:SSS" />
        </Card>
      </Col>

       <Col :span="6">
        <Card>
           <Statistic
            title="成交数"
            :value="11.28"
            :precision="2"
            suffix="%"
            :value-style="{ color: '#3f8600' }"
            style="margin-right: 50px" >
            <template #prefix>
              <ArrowUpOutlined style="vertical-align: middle;" />
            </template>
          </Statistic>
        </Card>
      </Col>
       <Col :span="6">
        <Card>
          <Statistic
            title="总下载数"
            :value="9.3"
            :precision="2"
            suffix="%"
            class="demo-class"
            :value-style="{ color: '#cf1322' }"
          >
            <template #prefix>
              <ArrowDownOutlined style="vertical-align: middle;" />
            </template>
          </Statistic>
        </Card>
      </Col>
    </Row>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Button, Row, Col, Statistic, Card } from "ant-design-vue";
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons-vue';
export default defineComponent({
  name: "Welocme",
  components: { Button, Row, Col, ArrowUpOutlined,ArrowDownOutlined, Statistic, StatisticCountdown: Statistic.Countdown, Card },
  setup() {
    const onFinish = () => {
      console.log("finished!");
    };
    return {
      deadline: Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30,
      onFinish,
    };
  },
});
</script>

<style lang="less" scoped>
.welcome {
  height: 100%;
  font-size: 18px;
}
</style>
