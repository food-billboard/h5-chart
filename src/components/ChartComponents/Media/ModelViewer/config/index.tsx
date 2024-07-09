import { InfoCircleOutlined } from '@ant-design/icons';
import { Component } from 'react';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import ComponentOptionConfig, {
  Tab,
} from '@/components/ChartComponents/Common/ComponentOptionConfig';
import Input from '@/components/ChartComponents/Common/Input';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import Switch from '@/components/ChartComponents/Common/Switch';
import ColorSelect from '@/components/ColorSelect';
import IconTooltip from '@/components/IconTooltip';
import { TModelConfig } from '../type';

const { Item } = ConfigList;
class Config extends Component<
  ComponentData.ComponentConfigProps<TModelConfig>
> {
  onKeyChange = (key: keyof TModelConfig, value: any) => {
    this.props.onChange({
      config: {
        options: {
          [key]: value,
        },
      },
    });
  };

  render() {
    const { value } = this.props;
    const {
      config: {
        options: {
          position,
          cameraControls,
          scale,
          animation,
          rotate,
          progress,
        },
      },
    } = value;

    return (
      <ComponentOptionConfig
        items={[
          {
            label: <Tab>相机</Tab>,
            children: (
              <ConfigList level={1}>
                <Item label="位置">
                  <FullForm label="x">
                    <InputNumber
                      value={position.x}
                      onChange={(value) =>
                        this.onKeyChange('position', { ...position, x: value })
                      }
                    />
                  </FullForm>
                  <FullForm label="y">
                    <InputNumber
                      value={position.y}
                      onChange={(value) =>
                        this.onKeyChange('position', { ...position, y: value })
                      }
                    />
                  </FullForm>
                  <FullForm label="z">
                    <InputNumber
                      value={position.z}
                      onChange={(value) =>
                        this.onKeyChange('position', { ...position, z: value })
                      }
                    />
                  </FullForm>
                </Item>
                <Item label="是否可控">
                  <FullForm>
                    <Switch
                      checked={cameraControls.show}
                      onChange={(value) =>
                        this.onKeyChange('cameraControls', {
                          ...cameraControls,
                          show: value,
                        })
                      }
                    />
                  </FullForm>
                </Item>
              </ConfigList>
            ),
            key: '1',
          },
          {
            label: <Tab>模型</Tab>,
            children: (
              <ConfigList level={1}>
                <Item label="初始缩放">
                  <FullForm>
                    <InputNumber
                      value={scale}
                      onChange={this.onKeyChange.bind(this, 'scale')}
                    />
                  </FullForm>
                </Item>
                <Collapse
                  child={{
                    header: '旋转',
                    key: 'rotate',
                    visibleRender: true,
                    onChange: (value) =>
                      this.onKeyChange('rotate', {
                        ...rotate,
                        show: value,
                      }),
                    value: rotate.show,
                  }}
                  parent={{
                    activeKey: ['rotate'],
                  }}
                >
                  <Item label="速度">
                    <FullForm>
                      <InputNumber
                        value={rotate.speed}
                        onChange={(value) =>
                          this.onKeyChange('rotate', {
                            ...rotate,
                            speed: value,
                          })
                        }
                      />
                    </FullForm>
                  </Item>
                  <Item label="延迟旋转">
                    <FullForm>
                      <InputNumber
                        value={rotate.delay}
                        onChange={(value) =>
                          this.onKeyChange('rotate', {
                            ...rotate,
                            delay: value,
                          })
                        }
                      />
                    </FullForm>
                  </Item>
                </Collapse>
              </ConfigList>
            ),
            key: '2',
          },
          {
            label: <Tab>动画</Tab>,
            children: (
              <ConfigList level={1}>
                <Item
                  label="动画名称"
                  placeholder={
                    <IconTooltip title="动画名称为模型当中定义的名称">
                      <InfoCircleOutlined />
                    </IconTooltip>
                  }
                >
                  <FullForm>
                    <Input
                      value={animation.name}
                      onChange={(value) =>
                        this.onKeyChange('animation', {
                          ...animation,
                          name: value,
                        })
                      }
                    />
                  </FullForm>
                </Item>
              </ConfigList>
            ),
            key: '3',
          },
          {
            label: <Tab>进度条</Tab>,
            children: (
              <ConfigList level={1}>
                <Item label="颜色">
                  <FullForm label="from">
                    <ColorSelect
                      value={progress.from}
                      onChange={(value) =>
                        this.onKeyChange('progress', {
                          ...progress,
                          from: value,
                        })
                      }
                    />
                  </FullForm>
                  <FullForm label="to">
                    <ColorSelect
                      value={progress.to}
                      onChange={(value) =>
                        this.onKeyChange('progress', { ...progress, to: value })
                      }
                    />
                  </FullForm>
                </Item>
              </ConfigList>
            ),
            key: '4',
          },
        ]}
      />
    );
  }
}

export default Config;
