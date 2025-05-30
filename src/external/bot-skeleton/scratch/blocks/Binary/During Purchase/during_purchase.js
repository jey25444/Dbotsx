import { localize } from '@deriv-com/translations';
import { appendCollapsedMainBlocksFields, modifyContextMenu } from '../../../utils';
import { sellContract } from '../../images';

window.Blockly.Blocks.during_purchase = {
    init() {
        this.jsonInit(this.definition());
    },
    definition() {
        return {
            message0: '%1 %2 %3',
            message1: '%1',
            message2: '%1',
            args0: [
                {
                    type: 'field_image',
                    src: sellContract,
                    width: 25,
                    height: 25,
                    alt: 'S',
                },
                {
                    type: 'field_label',
                    text: localize('3. Sell conditions'),
                    class: 'blocklyTextRootBlockHeader',
                },
                {
                    type: 'input_dummy',
                },
            ],
            args1: [
                {
                    type: 'input_statement',
                    name: 'DURING_PURCHASE_STACK',
                    check: 'SellAtMarket',
                },
            ],
            args2: [
                {
                    type: 'field_image',
                    src: ' ', // this is here to add extra padding
                    width: 380,
                    height: 10,
                },
            ],
            colour: window.Blockly.Colours.RootBlock.colour,
            colourSecondary: window.Blockly.Colours.RootBlock.colourSecondary,
            colourTertiary: window.Blockly.Colours.RootBlock.colourTertiary,
            tooltip: localize('Sell your active contract if needed (optional)'),
            category: window.Blockly.Categories.During_Purchase,
        };
    },
    meta() {
        return {
            display_name: localize('Sell conditions'),
            description: localize(
                'Here is where you can decide to sell your contract before it expires. Only one copy of this block is allowed.'
            ),
        };
    },
    onchange(event) {
        if (
            event.type === window.Blockly.Events.BLOCK_CHANGE ||
            (event.type === window.Blockly.Events.BLOCK_DRAG && !event.isStart)
        ) {
            if (this.isCollapsed()) {
                appendCollapsedMainBlocksFields(this);
            }
        }
    },
    customContextMenu(menu) {
        modifyContextMenu(menu);
    },
};

window.Blockly.JavaScript.javascriptGenerator.forBlock.during_purchase = block => {
    const stack = window.Blockly.JavaScript.javascriptGenerator.statementToCode(block, 'DURING_PURCHASE_STACK');

    const code = `BinaryBotPrivateDuringPurchase = function BinaryBotPrivateDuringPurchase() {
        Bot.highlightBlock('${block.id}');
        ${stack}
    };\n`;
    return code;
};
