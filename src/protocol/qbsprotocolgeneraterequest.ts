import { QbsProtocolDataKey } from './qbsprotocoldatakey';
import { QbsProtocolLogLevel } from './qbsprotocolloglevel';
import { QbsProtocolRequest } from './qbsprotocolrequest';
import { QbsProtocolRequestType } from './qbsprotocolrequesttype';

/** Helper data type for wrapping the generate request data for Qbs protocol. */
export class QbsProtocolGenerateRequest extends QbsProtocolRequest {
    public constructor(
        generatorName: string,
        keepGoing: boolean,
        logLevel: QbsProtocolLogLevel) {
        super();
        this.setGeneratorName(generatorName);
        this.setKeepGoing(keepGoing);
        this.setLogLevel(logLevel);
        this.setType(QbsProtocolRequestType.Generate);
    }

    public setGeneratorName(generatorName: string) {
        this.data[QbsProtocolDataKey.GeneratorName] = generatorName;
    }
}
