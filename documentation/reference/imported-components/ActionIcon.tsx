import React, { useState } from 'react';
import { 
  IconButton, 
  Tooltip, 
  Menu, 
  MenuItem,
  SvgIconTypeMap
} from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

interface ActionLink {
  label: string;
  url: string;
  icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string };
  onClick?: () => void;
  isExternal?: boolean;
}

interface ActionIconProps {
  links: ActionLink[];
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string };
  tooltip: string;
}

const ActionIcon: React.FC<ActionIconProps> = ({ links, icon: Icon, tooltip }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (links.length === 1) {
      if (links[0].onClick) {
        links[0].onClick();
      } else if (links[0].url !== '#') {
        window.open(links[0].url, '_blank', 'noopener,noreferrer');
      }
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (link: ActionLink) => {
    if (link.onClick) {
      link.onClick();
    } else if (link.isExternal || link.url !== '#') {
      window.open(link.url, '_blank', 'noopener,noreferrer');
    }
    handleClose();
  };

  return (
    <>
      <Tooltip title={tooltip}>
        <IconButton
          onClick={handleClick}
          sx={{ 
            color: '#E6196B',
            '&:hover': {
              backgroundColor: 'rgba(230, 25, 107, 0.04)'
            }
          }}
          aria-label={tooltip}
          aria-controls={open ? 'action-menu' : undefined}
          aria-haspopup={links.length > 1 ? 'true' : undefined}
          aria-expanded={open ? 'true' : undefined}
        >
          <Icon />
        </IconButton>
      </Tooltip>

      {links.length > 1 && (
        <Menu
          id="action-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          elevation={24}
          slotProps={{
            paper: {
              sx: {
                background: `linear-gradient(45deg, 
                  var(--gradient-start), 
                  var(--gradient-center), 
                  var(--gradient-end))`,
                boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.3)',
              }
            }
          }}
        >
          {links.map((link, index) => (
            <MenuItem
              key={index}
              onClick={() => handleMenuItemClick(link)}
              sx={{ 
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                }
              }}
            >
              {link.icon && <link.icon fontSize="small" />}
              {link.label}
            </MenuItem>
          ))}
        </Menu>
      )}
    </>
  );
};

export default ActionIcon; 