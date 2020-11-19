/**
 * 最基本的索引文档操作，单线程，可设置创建doc的间隔时间
 * - 创建了一个index template
 * - 创建了一个index
 * - 定时间隔向该index加入doc
 */

import { Client } from '@elastic/elasticsearch'
import { nanoid } from 'nanoid'
import delay from 'delay'
import './exit-handler'

const ELASTICSEARCH_URL = 'http://ant1:9200'
const INDEX_NAME = `user-events-${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`
const INDEX_MAPPING = {
    "properties": {
        "@timestamp": {
            "type": "date",
            "format": "yyyy-MM-dd HH:mm:ss||yyyy-MM-dd||epoch_millis"
        },
        "user_id": {
            "type": "keyword"
        },
        "create_at": {
            "type": "date",
            "format": "yyyy-MM-dd HH:mm:ss||yyyy-MM-dd||epoch_millis"
        },
        "action": {
            "type": "keyword"
        }
    }
}
const client = new Client({
    node: ELASTICSEARCH_URL
})

async function createIndexMapping() {
    await client.indices.create({
        index: INDEX_NAME,
        body: {
            mappings: INDEX_MAPPING
        }
    }, { ignore: [400] })
}

async function createTemplate() {
    await client.indices.putTemplate({
        name: 'simple-index-template',
        "index_patterns": ["user-events*"],
        create: false,
        body: {
            "settings": {
                "number_of_shards": 1,
                "number_of_replicas": 0
            },
            mappings: INDEX_MAPPING
        }
    })
}

async function addDocToIndex() {
    await client.index({
        index: `${INDEX_NAME}-003`,
        refresh: true,
        body: {
            "@timestamp": new Date().getTime(),
            "user_id": nanoid(10),
            "create_at": "2009-11-15 13:12:00",
            "action": "write"
        }
    })
}

(async () => {
    const INTERVAL = 10
    try {
        await createTemplate()
    } catch (error) {
        console.log(JSON.stringify(error))
    }

    for (let i = 1; ; i++) {
        await addDocToIndex()
        console.log(`add doc count: ${i}`)
        await delay(INTERVAL)
    }

})()


