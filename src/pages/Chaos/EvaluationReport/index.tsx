import React, { useEffect, useState } from 'react';
import Translation from '../../../components/Translation';
import classnames from 'classnames';
import i18n from '../../../i18n';
import styles from './index.css';

import { Button, Card, Select, Icon } from '@alicloud/console-components';
import { useDispatch } from 'utils/libs/sre-utils-dva';

import { CHAOS_DEFAULT_BREADCRUMB_ITEM as chaosDefaultBreadCrumb } from 'config/constants/Chaos/chaos';

const EvaluationReport = () => {
  const dispatch = useDispatch();
  const [currentSuite, setCurrentSuite] = useState('Suite1');
  const [gaussDbConfig, setGaussDbConfig] = useState({ deployment: '', version: '' });
  const [oceanBaseConfig, setOceanBaseConfig] = useState({ deployment: '', version: '' });

  useEffect(() => {
    dispatch.pageHeader.setTitle('');
    dispatch.pageHeader.setBreadCrumbItems(chaosDefaultBreadCrumb.concat([
      {
        key: '/chaos/evaluation-report',
        value: i18n.t('Evaluation Report'),
        path: '',
      },
    ]));
  }, []);



  // 渲染指标项
  const renderMetricItem = (title: string, description: string, subMetrics: any[]) => (
    <div className={styles.segment}>
      <div className={styles.metricHeader}>
        <div className={styles.metricCategory}>
          <div className={styles.categoryTitle}>{title}</div>
          <div className={styles.categoryDesc}>{description}</div>
        </div>
        <div className={styles.subMetrics}>
          {subMetrics.map((metric, index) => (
            <div key={index} className={styles.subMetricItem}>
              <div className={styles.subMetricTitle}>{metric.title}</div>
            </div>
          ))}
        </div>
        <div className={styles.gaussColumn}>
          {subMetrics.map((metric, index) => (
            <div key={index} className={styles.metricValue}>
              <div className={styles.valueContainer}>
                <span className={styles.valueText}>{metric.gaussValue}</span>
                {metric.unit && <span className={styles.unit}>{metric.unit}</span>}
              </div>
              <Icon type="link" className={styles.linkIcon} />
            </div>
          ))}
        </div>
        <div className={styles.oceanColumn}>
          {subMetrics.map((metric, index) => (
            <div key={index} className={styles.metricValue}>
              <div className={styles.valueContainer}>
                <span className={styles.valueText}>{metric.oceanValue}</span>
                {metric.unit && <span className={styles.unit}>{metric.unit}</span>}
              </div>
              <Icon type="link" className={styles.linkIcon} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      {/* 顶部配置区域 */}
      <div className={styles.header}>
        <div className={styles.alignedLayout}>
          <div className={styles.leftSection}>
            <div className={styles.suiteConfig}>
              <span className={styles.suiteLabel}>测评用例套件:</span>
              <Select
                className={styles.suiteSelect}
                value={currentSuite}
                onChange={setCurrentSuite}
              >
                <Select.Option value="Suite1">Suite1</Select.Option>
                <Select.Option value="Suite2">Suite2</Select.Option>
              </Select>
              <Button text className={styles.suiteDesc}>
                {currentSuite} 说明 <Icon type="link" />
              </Button>
            </div>
          </div>
          <div className={styles.middlePlaceholder}>
            {/* 空白区域，与中间指标标题区域对齐 */}
          </div>
          <div className={styles.gaussDbColumn}>
            <div className={styles.dbTitle}>GaussDB</div>
            <div className={styles.configRow}>
              <span className={styles.configLabel}>部署</span>
              <Select
                className={styles.configSelect}
                value={gaussDbConfig.deployment}
                onChange={(value) => setGaussDbConfig({...gaussDbConfig, deployment: value})}
                placeholder="选择部署方式"
              >
                <Select.Option value="single">单机部署</Select.Option>
                <Select.Option value="cluster">集群部署</Select.Option>
              </Select>
            </div>
            <div className={styles.configRow}>
              <span className={styles.configLabel}>版本</span>
              <Select
                className={styles.configSelect}
                value={gaussDbConfig.version}
                onChange={(value) => setGaussDbConfig({...gaussDbConfig, version: value})}
                placeholder="选择版本"
              >
                <Select.Option value="v3.0">v3.0</Select.Option>
                <Select.Option value="v3.1">v3.1</Select.Option>
              </Select>
            </div>
          </div>
          
          <div className={styles.oceanBaseColumn}>
            <div className={styles.dbTitle}>OceanBase</div>
            <div className={styles.configRow}>
              <span className={styles.configLabel}>部署</span>
              <Select
                className={styles.configSelect}
                value={oceanBaseConfig.deployment}
                onChange={(value) => setOceanBaseConfig({...oceanBaseConfig, deployment: value})}
                placeholder="选择部署方式"
              >
                <Select.Option value="single">单机部署</Select.Option>
                <Select.Option value="cluster">集群部署</Select.Option>
              </Select>
            </div>
            <div className={styles.configRow}>
              <span className={styles.configLabel}>版本</span>
              <Select
                className={styles.configSelect}
                value={oceanBaseConfig.version}
                onChange={(value) => setOceanBaseConfig({...oceanBaseConfig, version: value})}
                placeholder="选择版本"
              >
                <Select.Option value="v4.0">v4.0</Select.Option>
                <Select.Option value="v4.1">v4.1</Select.Option>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* 指标展示区域 */}
      <div className={styles.metricsContainer}>
        {/* 数据可靠性 */}
        {renderMetricItem(
          '数据可靠性',
          '发生故障时，保护用户数据完整性和一致性的能力，以及单位数据量备份恢复的效率',
          [
            {
              title: '数据丢失量',
              gaussValue: '0',
              oceanValue: '0',
              unit: '/ event'
            },
            {
              title: '数据恢复效率',
              gaussValue: '2000M',
              oceanValue: '1500M',
              unit: '/s'
            }
          ]
        )}

        {/* 数据可用性 */}
        {renderMetricItem(
          '数据可用性',
          '发生故障时，系统能够正常运行并提供服务的能力，在典型故障集合中能够自动容错的比例',
          [
            {
              title: '业务中断时间',
              gaussValue: '6s',
              oceanValue: '10s',
              unit: '/ event'
            },
            {
              title: '故障自动恢复率',
              gaussValue: '85% @ 65 events',
              oceanValue: '85% @ 65 events',
              unit: ''
            }
          ]
        )}

        {/* 业务稳定性 */}
        {renderMetricItem(
          '业务稳定性',
          '发生故障时（亚健康故障）吞吐时延变化率，Failover后剩余节点承载能力/恢复故障前水平能力',
          [
            {
              title: '吞吐变化率',
              gaussValue: '↓ 10% during 10min',
              oceanValue: '↓ 15% during 10min',
              unit: ''
            },
            {
              title: '时延变化率',
              gaussValue: '↑ 8% during 10min',
              oceanValue: '↓ 10% during 10min',
              unit: ''
            }
          ]
        )}

        {/* 综合测评结果 */}
        {renderMetricItem(
          '综合测评结果',
          '',
          [
            {
              title: '综合得分',
              gaussValue: 'XXX',
              oceanValue: 'XXX',
              unit: ''
            },
            {
              title: '可用性等级',
              gaussValue: 'XXX',
              oceanValue: 'XXX',
              unit: ''
            }
          ]
        )}
      </div>
    </div>
  );
};

export default EvaluationReport; 